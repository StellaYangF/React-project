import React, { PropsWithChildren, useState } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import {
  Table,
  Button,
  InputNumber,
  Popconfirm,
  Row,
  Col,
  Badge,
  Modal,
} from "antd";
import { CombinedState } from "@/store/reducers";
import NavHeader from "@/components/NavHeader";
import Lesson from "@/typings/lesson";
import { StaticContext } from "react-router";
import actions from "@/store/actions/cart";
import { CartItem } from "@/typings/cart";
import { getNumber } from "@/utils";
import './index.less';

interface Params {
  id: string;
}
type RouteProps = RouteComponentProps<Params, StaticContext, Lesson>;
interface Params {
  id: string;
}
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actions;
type Props = PropsWithChildren<RouteProps & StateProps & DispatchProps>;
function Cart(props: Props) {
  let [settleVisible, setSettleVisible] = useState(false);
  const confirmSettle = () => {
    setSettleVisible(true);
  };
  const handleOk = () => {
    setSettleVisible(false);
    props.settle();
  };
  const handleCancel = () => {
    setSettleVisible(false);
  };
  const columns = [
    {
      title: "Product",
      dataIndex: "lesson",
      render: (val: Lesson, row: CartItem) => (
        <>
          <p>{val.title}</p>
          <p>Unit: {val.price}</p>
        </>
      ),
    },
    {
      title: "Count",
      dataIndex: "count",
      render: (val: number, row: CartItem) => (
        <InputNumber
          size="small"
          min={1}
          max={10}
          value={val}
          onChange={(value: any) =>
            props.changeCartItemCount(row.lesson._id, value)
          }
        />
      ),
    },
    {
      title: "Delete",
      render: (val: any, row: CartItem) => (
        <Popconfirm
          title="Sure to delete it?"
          onConfirm={() => props.removeCartItem(row.lesson._id)}
          okText="Sure"
          
          cancelText="Cancel"
        >
          <Button size="small" type="primary" danger>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];
  const rowSelection = {
    selectedRowKeys: props.cart
      .filter((item: CartItem) => item.checked)
      .map((item: CartItem) => item.lesson._id),
    onChange: (selectedRowKeys: string[]) => {
      props.changeCheckedCartItems(selectedRowKeys);
    },
  };
  let totalCount: number = props.cart
    .filter((item: CartItem) => item.checked)
    .reduce((total: number, item: CartItem) => total + item.count, 0);
  let totalPrice = props.cart
    .filter((item: CartItem) => item.checked)
    .reduce(
      (total: number, item: CartItem) =>
        total + getNumber(item.lesson.price) * item.count,
      0
    );
  return (
    <>
      <NavHeader history={props.history}>Cart</NavHeader>
      <Table
        rowKey={(row) => row.lesson._id}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={props.cart}
        pagination={false}
        size="small"
        className='cart-list'
      />
      <Row style={{ padding: "5px" }}>
        <Col span={14}>
          <Button danger type="primary" size="small" onClick={props.clearCartItems}>
            Clear
          </Button>
        </Col>
        <Col span={10}>
          Products chosen: {totalCount > 0 ? <Badge count={totalCount} /> : 0} 
        </Col>
      </Row>
      <Row>
        <Col span={14}>
          <Button type="primary" size="small" onClick={confirmSettle}>
            Checkout
          </Button>
        </Col>
        <Col span={10}>Total: <span style={{ fontWeight: 'bold' }}> {totalPrice} </span>RMB</Col>
      </Row>
      <Modal
        title="Go to checkout"
        visible={settleVisible}
        onOk={handleOk}
        centered
        onCancel={handleCancel}
        okText='Sure'
        cancelText='Cancel'
      >
        <p>Sure to checkout?</p>
      </Modal>
    </>
  );
}
let mapStateToProps = (state: CombinedState): CombinedState => state;
export default connect(mapStateToProps, actions)(Cart);