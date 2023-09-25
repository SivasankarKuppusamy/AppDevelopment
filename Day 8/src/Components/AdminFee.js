import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Button, TextField, Box, Paper } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Autocomplete from '@mui/material/Autocomplete';
import { PieChart, Pie, Cell } from 'recharts';
import './AdminFee.css';

import StudentData from './StudentData'; 

export default function AdminFee() {
  const COLORS = ['#0088FE', '#FF8042'];
  const [students, setStudents] = useState(StudentData);
  const [paymentData, setPaymentData] = useState({
    studentId: '',
    amount: '',
    studentName: '',
    studentDepartment: '',
    studentYear: '',
  });

  const pieChartData = [
    { name: 'Fees Paid', value: students.reduce((acc, student) => acc + student.feesPaid, 0) },
    { name: 'Remaining Fees', value: students.reduce((acc, student) => acc + (student.totalFees - student.feesPaid), 0) },
  ];

  const handlePayment = (e) => {
    e.preventDefault();
    if (!paymentData.studentId || !paymentData.amount) {
      alert('Please enter both student ID and amount.');
    } else {
      const studentId = parseInt(paymentData.studentId, 10);
      const amount = parseInt(paymentData.amount, 10);

      const studentIndex = students.findIndex((s) => s.id === studentId);

      if (studentIndex === -1) {
        alert('Student not found.');
      } else if (amount > students[studentIndex].totalFees - students[studentIndex].feesPaid) {
        alert('Fees Paid is greater than Total fees.');
      } else {
        const updatedStudents = [...students]; 
        updatedStudents[studentIndex].feesPaid += amount; 

        setStudents(updatedStudents);
        setPaymentData({
          studentId: '',
          studentName: '',
          amount: '',
          studentDepartment: '',
          studentYear: '',
        });
      }
    }
  };

  const chartData = students.map((student) => ({
    name: student.name,
    feesPaid: student.feesPaid,
    totalFees: student.totalFees,
  }));

  const studentOptions = students.map((student) => ({
    id: student.id,
    name: student.name,
    department: student.department,
    year: student.year,
  }));

  return (
    <div className="admin-fee">
      <Typography variant="h4" gutterBottom>
        Fee Report
      </Typography>
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <div className="chart-container">
          <BarChart width={500} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="feesPaid" fill="rgba(54, 162, 235, 0.6)" name="Fees Paid" />
            <Bar dataKey="totalFees" fill="rgba(255, 99, 132, 0.6)" name="Total Fees" />
          </BarChart>
          <div className="pie-chart">
            <PieChart width={300} height={300}>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={pieChartData}
                cx={150}
                cy={150}
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
            <div className="pie-chart-reference">
              <div>
                <span className="legend-color" style={{ backgroundColor: COLORS[0] }}></span> Fees Paid
              </div>
              <div>
               &nbsp; <span className="legend-color" style={{ backgroundColor: COLORS[1] }}></span> Remaining Fees
              </div>
            </div>
          </div>
        </div>
      </Paper>
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h6" gutterBottom>
          Student List
        </Typography>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={students}
            columns={[
              { field: 'id', headerName: 'ID', flex: 1 },
              { field: 'name', headerName: 'Name', flex: 2 },
              { field: 'department', headerName: 'Department', flex: 2 },
              { field: 'year', headerName: 'Year', flex: 2 },
              { field: 'feesPaid', headerName: 'Fees Paid', flex: 1 },
              { field: 'totalFees', headerName: 'Total Fees', flex: 1 },
              {
                field: 'paymentStatus',
                headerName: 'Payment Status',
                flex: 1,
                renderCell: (params) => (
                  <div
                  className={`payment-status ${
                    params.row.feesPaid >= params.row.totalFees ? 'paid' : 'not-paid'
                  }`}
                >
                  {params.row.feesPaid >= params.row.totalFees ? (
                    <span style={{ color: 'green' }}>Paid</span>
                  ) : (
                    <span style={{ color: 'red' }}>Not Paid</span>
                  )}
                </div>
                ),
              },
            ]}
          />
        </div>
      </Paper>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h6" gutterBottom>
          Make Payment
        </Typography>
        <Box display="flex" alignItems="center">
          <Autocomplete
            id="student-autocomplete"
            options={studentOptions}
            getOptionLabel={(option) => option.id.toString()}
            onChange={(event, newValue) => {
              if (newValue) {
                setPaymentData({
                  ...paymentData,
                  studentId: newValue.id.toString(),
                  studentName: newValue.name,
                  studentDepartment: newValue.department,
                  studentYear: newValue.year,
                });
              }
            }}
            value={studentOptions.find((option) => option.id.toString() === paymentData.studentId)}
            renderInput={(params) => (
              <TextField
                {...params}
                type="text"
                label="Student ID"
                variant="filled"
                className="input-field"
                id="stu-id"
            style={{ width: '250px', padding: '8px' }}

              />
            )}
          />
          <TextField
            type="text"
            label="Student Name"
            variant="filled"
            value={paymentData.studentName}
            disabled
            style={{ padding: '8px' }}
          />
          <TextField
            type="text"
            label="Department"
            variant="filled"
            value={paymentData.studentDepartment}
            style={{padding: '8px' }}
            disabled
          />
          <TextField
            type="text"
            label="Year"
            variant="filled"
            value={paymentData.studentYear}
            style={{padding: '8px' }}
            disabled
          />
          <TextField
            type="number"
            placeholder="Amount"
            className="input-field"
            value={paymentData.amount}
            style={{padding: '8px' }}
            onChange={(e) => setPaymentData({ ...paymentData, amount: e.target.value })}
          />
          <Button
            variant="contained"
            color="primary"
            className="payment-button"
            onClick={handlePayment}
          >
            Pay
          </Button>
        </Box>
      </Paper>
    </div>
  );
}
