import React, { useEffect, useState } from 'react'
import { BarChatWrapper, PurchaseHeader, PurchaseSaleWrapper, ResponsiveContainerStyled } from './PurchaseSale.style'
import {
    BarChart,
    Bar,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
  } from 'recharts';
import axios from 'axios';
import { token } from '../../context/UserToken';


export default function PurchaseSale() {



// Sample data format (date, purchase value, sale value)
// const data = [
//     { date: '2025-01-01', purchase: 200, sale: 300 },
//     { date: '2025-01-02', purchase: 150, sale: 250 },
//     { date: '2025-01-03', purchase: 300, sale: 450 },
//     { date: '2025-01-04', purchase: 500, sale: 700 },
//     { date: '2025-01-05', purchase: 400, sale: 600 },
//   ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      try {
        // const res = await axios.get('/api/reports/salePurchase');
        const res = await axios.get(`${process.env.REACT_APP_URL}/api/reports/salePurchase`, {
                                                            headers: {
                                                              Authorization: `Bearer ${token}`
                                                            }
                                                      }); 
        console.log(res.data)
        setData(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
         setLoading(false);
      } 
    };
    fetchChartData();
  }, []);


  return (
    <PurchaseSaleWrapper>
        <PurchaseHeader>
            Purchase and Sales
        </PurchaseHeader>

        {/* chart */}
        <BarChatWrapper>
           {loading ? (
          <div style={{height: "100%", width: "100%", display: 'flex', justifyContent: "center", alignItems: "center" }}>
            <p>Loading</p>
          </div>
        ) : (
            <ResponsiveContainerStyled>
                <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{fontSize: 12}} />
                <YAxis tick={{fontSize: 12}}/>
                <Tooltip itemStyle={{fontSize: 12}} />
                <Legend wrapperStyle={{fontSize: 12}} />
                <Bar dataKey="purchase" barSize={14} fill="#2563eb" />
                <Bar dataKey="sale" barSize={14} fill="#16a34a" />
                </BarChart>
            </ResponsiveContainerStyled>
        )}
        </BarChatWrapper>
    </PurchaseSaleWrapper>
  )
}
