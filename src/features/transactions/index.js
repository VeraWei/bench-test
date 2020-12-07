import { Table, message } from "antd";
import { useState, useEffect } from "react";
import reqwest from "reqwest";
import 'antd/dist/antd.css';
import "./index.css";

export const Transactions = () => {
    const [data, setData] = useState([]);
    const [ pagination, setPagination ] = useState({
        current: 1,
        pageSize: 10,
    });
    const [ loading, setLoading ] = useState(false);

    const fetch = (params = {}) => {
        setLoading(true);
        reqwest({
            url: `https://resttest.bench.co/transactions/${params.pagination.current}.json`,
            crossOrigin: true,
        }).then((data) => {

            setData([...data.transactions]);
            setLoading(false);
            setPagination({
                ...params.pagination,
                current: data.page,
                total:data.totalCount,
            });
        }).catch((error)=> {
            // error toast
            message.error('Fetch data error');
            throw(new Error(error.statusText))
        });
    };

    useEffect(() => {
        // initial loading
        fetch({pagination});
    }, []);

    // page changing handler
    const handleTableChange = (pagination) => {
        fetch({
            pagination
        });
    };

    // table columns
    const columns = [
        {
            title: "Date",
            dataIndex: "Date",
            width: "10%",
        },
        {
            title: "Company",
            dataIndex: "Company",
            width: "40%",
        },
        {
            title: "Ledger",
            dataIndex: "Ledger",
            width: "40%",
        },
        {
            title: "Amount",
            dataIndex: "Amount",
            render: Amount => `$${Amount}`,
            width: "10%"
        },
    ];
    
    return (
        <div className="content">
            <Table
                columns={columns}
                rowKey={(record, index) => `${record.Ledger}_${index}`}
                rowClassName="item"
                dataSource={data}
                pagination={pagination}
                loading={loading}
                onChange={handleTableChange}
            />
        </div>
    );
};
