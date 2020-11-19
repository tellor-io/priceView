import React, { useEffect, useState, Fragment, useContext } from "react";
import { Table, Button, Modal, Input, Alert } from "antd";
import axios from "axios";
import _ from "lodash";
import { PSRs } from "utils/psr";
import TellorFund from "utils/contracts/TellorFund";
import Lottie from "react-lottie";
import animationData from "../../assets/Tellor__Loader.json";
import { CurrentUserContext, Web3ModalContext } from "../../contexts/Store";
import { createWeb3User, signInWithWeb3 } from "../../utils/auth";

const { Column } = Table;

const contractAddressesMap = {
  1: "0x0ba45a8b5d5575935b8158a88c631e9f9c95a2e5",
  4: "0xFe41Cb708CD98C5B20423433309E55b53F79134a",
};

export default () => {
  const [web3Modal, setWeb3Modal] = useContext(Web3ModalContext);
  const [, setCurrentUser] = useContext(CurrentUserContext);
  const [priceLoading, setPriceLoading] = useState(true);
  const [totalTipsLoading, setTotalTipsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [contract, setContract] = useState(false);
  const [tip, setTip] = useState(false);
  const [visible, setVisible] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [selectedID, setSelectedID] = useState(undefined);

  useEffect(() => {
    const apiPromises = [];
    const priceAPIPromises = [];
    let tempTableData = [...tableData];

    async function loadData() {
      try {
        Object.keys(PSRs).forEach((id) =>
          tempTableData.push({
            id,
            type: PSRs[id].name,
          })
        );
        setTableData(tempTableData);

        Object.keys(PSRs).forEach((id) => {
          apiPromises.push(
            new Promise((resolve, reject) => {
              axios
                .get(`http://api.tellorscan.com/requestinfo/${id}`)
                .then((res) => {
                  resolve(res);
                });
            })
          );
          priceAPIPromises.push(
            new Promise((resolve, reject) => {
              axios.get(`http://api.tellorscan.com/price/${id}`).then((res) => {
                resolve(res);
              });
            })
          );
        });
        Promise.all(apiPromises)
          .then(function (values) {
            const totalTips = [..._.map(values, "data")];
            totalTips.map((tipObj, index) => {
              tempTableData[index].totalTip = tipObj.totalTip;

              return tempTableData[index];
            });

            setTableData(tempTableData);
            setTotalTipsLoading(false);
          })
          .then(() => {
            Promise.all(priceAPIPromises).then((values) => {
              const prices = [..._.map(values, "data")];
              prices.map((priceObj, index) => {
                tempTableData[index].price =
                  +priceObj[0].value / +PSRs[tempTableData[index].id].granularity;
                // ).toFixed(2);

                return tempTableData[index];
              });
              setTableData(tempTableData);
              setPriceLoading(false);
            });
          });
      } catch (e) {
        alert(
          `Failed to load web3, be sure to be connected to the right Metamask network and reload teh browser!`
        );
        console.error(e);
      }
    }

    loadData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showModal = async (index) => {
    try {
      const w3c = await signInWithWeb3();
      const accounts = await w3c.web3.eth.getAccounts();

      setAccounts(accounts);
      setWeb3Modal(w3c);
      const user = createWeb3User(accounts[0]);

      setCurrentUser(user);
      const instance = await new w3c.web3.eth.Contract(
        TellorFund.abi,
        contractAddressesMap[await w3c.web3.eth.getChainId()]
      );

      setContract(instance);
      setSelectedID(index + 1);
      setVisible(true);
    } catch (error) {
      console.log("web3Modal error", error);
    }
  };

  const handleOk = async (e) => {
    if (!isTipValid()) {
      return;
    }

    contract.methods
      .addTip(selectedID, tipToWei())
      .send({
        from: accounts[0],
        to: contractAddressesMap[await web3Modal.web3.eth.getChainId()],
      })
      .then((res) => {
        console.log("response: ", res);
      });

    setVisible(false);
  };

  const handleCancel = (e) => {
    setVisible(false);
  };

  const isTipValid = () => {
    const numericTip = parseFloat(tip.replaceAll(',', '.'));

    return !isNaN(numericTip) && numericTip > 0;
  }

  const tipToWei = () => {
    return web3Modal.web3.utils.toWei(tip.replaceAll(',', '.'), 'ether');
  }

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  if (totalTipsLoading || priceLoading)
    return <Lottie options={lottieOptions} height={120} width={120} />;

  return (
    <Fragment>
      <Table dataSource={tableData} bordered pagination={false} rowKey="id">
        <Column title="Type" dataIndex="type" key="type" />
        <Column title="Last Value" dataIndex="price" key="price" />
        <Column title="Current Tip" dataIndex="totalTip" key="totalTip" />
        <Column
          title=""
          key="action"
          align="right"
          render={(text, record, index) => (
            <Fragment>
              <Button
                type="primary"
                size="small"
                onClick={() => showModal(index)}
              >
                + Add Tip
              </Button>
            </Fragment>
          )}
        />
      </Table>
      <Modal
        title="Input Tip"
        visible={visible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" type="default" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Submit
          </Button>,
        ]}
      >
        {tip < 0 && (
          <Alert
            message="Tip should be larger than 0"
            type="error"
            style={{ marginBottom: 10 }}
          />
        )}
        <Input
          placeholder="Amount of TRB "
          onChange={(e) => setTip(e.target.value)}
        />
      </Modal>
    </Fragment>
  );
};
