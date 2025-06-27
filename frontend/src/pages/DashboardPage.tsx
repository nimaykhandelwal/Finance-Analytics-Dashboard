// src/pages/DashboardPage.tsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import {
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    Stat,
    StatLabel,
    StatNumber,
    useToast,
} from '@chakra-ui/react'
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from 'recharts'
import { CSVLink } from 'react-csv'
import { TransactionTable, Transaction } from '../components/TransactionTable'

interface ChartData {
    date: string
    income: number
    expense: number
}

export default function DashboardPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [chartData, setChartData] = useState<ChartData[]>([])
    const toast = useToast()
    const navigate = useNavigate()

    const fetchTransactions = async () => {
        try {
            const res = await api.get<Transaction[]>('/transactions')
            setTransactions(res.data)

            // build per‐date totals
            const grouped: Record<string, ChartData> = {}
            res.data.forEach((tx) => {
                const date = tx.date.split('T')[0]
                if (!grouped[date]) grouped[date] = { date, income: 0, expense: 0 }
                if (tx.type === 'income') grouped[date].income += tx.amount
                else grouped[date].expense += tx.amount
            })
            setChartData(
                Object.values(grouped).sort((a, b) =>
                    a.date.localeCompare(b.date)
                )
            )
        } catch (err: any) {
            toast({
                title: 'Error fetching data',
                description: err.message,
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
        }
    }

    useEffect(() => {
        fetchTransactions()
    }, [])

    const totalIncome = transactions
        .filter((t) => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0)
    const totalExpense = transactions
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0)

    const csvHeaders = [
        { label: 'Date', key: 'date' },
        { label: 'Type', key: 'type' },
        { label: 'Amount', key: 'amount' },
        { label: 'Description', key: 'description' },
    ]
    const csvData = transactions.map((t) => ({
        date: t.date.split('T')[0],
        type: t.type,
        amount: t.amount,
        description: t.description,
    }))

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login', { replace: true })
    }

    return (
        <Box p={6}>
            {/* top bar with title + logout */}
            <Flex
                justify="space-between"
                align="center"
                mb={6}
            >
                <Heading>Financial Dashboard</Heading>
                <Button
                    colorScheme="red"
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </Flex>

            {/* summary stats */}
            <HStack spacing={8} mb={8}>
                <Stat flex={1} boxShadow="md" p={4} borderRadius="md">
                    <StatLabel>Total Income</StatLabel>
                    <StatNumber color="green.500">
                        ${totalIncome}
                    </StatNumber>
                </Stat>
                <Stat flex={1} boxShadow="md" p={4} borderRadius="md">
                    <StatLabel>Total Expense</StatLabel>
                    <StatNumber color="red.500">
                        ${totalExpense}
                    </StatNumber>
                </Stat>
            </HStack>

            {/* line chart */}
            <Box
                w="100%"
                h={300}
                mb={6}
                boxShadow="md"
                p={4}
                borderRadius="md"
            >
                <ResponsiveContainer>
                    <LineChart data={chartData}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="income"
                            stroke="#38A169"
                        />
                        <Line
                            type="monotone"
                            dataKey="expense"
                            stroke="#E53E3E"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </Box>

            {/* CSV export */}
            <Flex justify="flex-end" mb={4}>
                <CSVLink
                    data={csvData}
                    headers={csvHeaders}
                    filename="transactions.csv"
                >
                    <Button colorScheme="blue">
                        Export CSV
                    </Button>
                </CSVLink>
            </Flex>

            {/* full transaction table / filters */}
            <TransactionTable
                transactions={transactions}
                onRefresh={fetchTransactions}
            />
        </Box>
    )
}
