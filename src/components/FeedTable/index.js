import React, {useEffect, useState, Fragment} from 'react'
import styled from 'styled-components'
import ReactLoading from 'react-loading'
import { Table, Button, Modal, Input, Alert, notification } from 'antd';
import axios from 'axios'
import _ from 'lodash'
import getWeb3 from 'utils/getWeb3'
import PSRs from 'utils/psr'
import TellorFund from 'utils/contracts/TellorFund'
const { Column } = Table

const StyledButton = styled(Button)`
  color: #6CC7A3;
  border-color: #6CC7A3;
  font-size: 20px;
  border-radius: 10px;
  background: transparent;
  &:hover, &:active, &:focus {
    background-color: transparent;
  }
`

const StyledTable = styled(Table)`
&&& {
  table {
    border-top: none;
    border-left: none;
    tr, td, th {
      color: white;
    }
    td:first-child {
      border-left: 1px solid white;
    }
    th {
      border-right: none;
      background: transparent;
    }
    tr:hover {
      td {
        background-color: #536350;
      }
    }
  }
}
`

const contractAddress ="0xFe41Cb708CD98C5B20423433309E55b53F79134a"//"0xc47d2339077F5aC117dD1B2953D5c54a0c0B89fa, 0x7d67E614d92b9D070839954dfd82ceEc7daFDAeD, 0xFe41Cb708CD98C5B20423433309E55b53F79134a";

export default () => {
  const [priceLoading, setPriceLoading] = useState(true)
  const [totalTipsLoading, setTotalTipsLoading] = useState(true)
  const [tableData, setTableData] = useState([])
  const [contract, setContract] = useState(false)
  const [tip, setTip] = useState(false)
  const [visible, setVisible] = useState(false)
  const [accounts, setAccounts] = useState([])
  const [selectedID, setSelectedID] = useState(undefined)
  const [isMetamask, setIsMetaMask] = useState(false)
  useEffect(() => {
    const apiPromises = []
    const priceAPIPromises = []
    let tempTableData = [...tableData]
    async function web3Connect() {
      try {
        const web3 = await getWeb3();
        setIsMetaMask(web3.currentProvider.isMetaMask)
        const accounts = await web3.eth.getAccounts();
        setAccounts(accounts)
        const instance = await new web3.eth.Contract(TellorFund.abi, contractAddress);
        setContract(instance)

        PSRs.map(type => tempTableData.push({
          type
        }))
        setTableData(tempTableData)
        PSRs.map((item, index) => {
          apiPromises.push(new Promise((resolve, reject) => {
            axios.get(`http://api.tellorscan.com/requestinfo/${index+1}`).then(res => {
              resolve(res)
            })
          }))
          priceAPIPromises.push(new Promise((resolve, reject) => {
            axios.get(`http://api.tellorscan.com/price/${index+1}`).then(res => {
              resolve(res)
            })
          }))
        })
        Promise.all(apiPromises).then(function(values) {
          const totalTips = [..._.map(values, 'data')]
          totalTips.map((tipObj, index) => tempTableData[index].totalTip = tipObj.totalTip)
          setTableData(tempTableData)
          setTotalTipsLoading(false)
        })
        Promise.all(priceAPIPromises).then(values => {
          const prices = [..._.map(values, 'data')]
          prices.map((priceObj, index) => {
            tempTableData[index].price = priceObj.value
          })
          setTableData(tempTableData)
          setPriceLoading(false)
        })
      } catch (e) {
        alert(
          `Failed to load web3, be sure to be connected to the right Metamask network and reload teh browser!`,
        );
        console.error(e);
      }
    }

    web3Connect()

  }, [])

  const showModal = (index) => {
    if (isMetamask) {
      setSelectedID(index + 1)
      setVisible(true)
    } else {
      notification['warning']({
        message: 'Metamask not found',
        description:
          'Please intsall metamask on the browser!',
      });
    }
  };

  const handleOk = e => {
      if(tip >= 0){
        contract.methods.addTip(selectedID, tip).send({
          from: accounts[0],
          to: contractAddress,
        }).then((res)=>{
          console.log("response: ", res)
        });
        setVisible(false)
      } else {

      }
  };

  const handleCancel = e => {
    console.log(e);
    setVisible(false)
  };

  if (totalTipsLoading || priceLoading)
    return <ReactLoading type="spin" />
  return (
    <Fragment>
      <StyledTable
        dataSource={tableData}
        bordered
        pagination={false}
      >
        <Column title="Type" dataIndex="type" key="type" />
        <Column title="Last Update" dataIndex="price" key="price" />
        <Column title="Current Tip" dataIndex="totalTip" key="totalTip" />
        <Column
          title=""
          key="action"
          align="right"
          render={(text, record, index) => (
            <Fragment>
              <StyledButton onClick={() => showModal(index)}>+</StyledButton>
            </Fragment>
          )}
        />
      </StyledTable>
      <Modal
        title="Input Tip"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {tip < 0 && <Alert message="Tip should be larger than 0" type="error" style={{marginBottom: 10}} />}
        <Input placeholder="Basic usage" onChange={e => setTip(e.target.value)} />
      </Modal>
    </Fragment>
  )
}