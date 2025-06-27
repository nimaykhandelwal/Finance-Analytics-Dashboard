import React, { useMemo, useState } from 'react'
import {
    Table, Thead, Tbody, Tr, Th, Td,
    IconButton, Input, Select,
    HStack, Button, Flex, Box, Text,
    useDisclosure
} from '@chakra-ui/react'
import { ChevronUpIcon, ChevronDownIcon, EditIcon, DeleteIcon, AddIcon } from '@chakra-ui/icons'
// after (correct)
import { AddEditTransactionModal } from './AddEditTransactionModal'
import { FilterDrawer } from './FilterDrawer'
import api from '../api/axios'


export interface Transaction {
    _id: string
    userId: string
    type: 'income' | 'expense'
    amount: number
    description: string
    date: string
}

interface Props {
    transactions: Transaction[]
    onRefresh: () => void
}

export const TransactionTable: React.FC<Props> = ({ transactions, onRefresh }) => {
    const [page, setPage] = useState(1)
    const perPage = 10

    const [sortBy, setSortBy] = useState<keyof Transaction>('date')
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
    const [globalSearch, setGlobalSearch] = useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()    // filter drawer
    const {
        isOpen: isModalOpen,
        onOpen: openModal,
        onClose: closeModal
    } = useDisclosure()
    const [editTx, setEditTx] = useState<Transaction | undefined>()

    // Derived & filtered data
    const filtered = useMemo(() => {
        let data = [...transactions]
        // global text search
        if (globalSearch.trim()) {
            const term = globalSearch.toLowerCase()
            data = data.filter(tx =>
                tx.description.toLowerCase().includes(term) ||
                tx.type.includes(term) ||
                tx.date.includes(term)
            )
        }
        // TODO: apply FilterDrawerʼs column filters (via context or props)
        // sort
        data.sort((a, b) => {
            const av = (a[sortBy] as any)
            const bv = (b[sortBy] as any)
            if (av < bv) return sortDir === 'asc' ? -1 : 1
            if (av > bv) return sortDir === 'asc' ? 1 : -1
            return 0
        })
        return data
    }, [transactions, globalSearch, sortBy, sortDir])

    const pageCount = Math.ceil(filtered.length / perPage)
    const pageData = filtered.slice((page - 1) * perPage, page * perPage)

    const toggleSort = (field: keyof Transaction) => {
        if (sortBy === field) {
            setSortDir(s => s === 'asc' ? 'desc' : 'asc')
        } else {
            setSortBy(field)
            setSortDir('asc')
        }
    }

    return (
        <Box>
            <Flex mb={4} justify="space-between">
                <HStack>
                    <Input
                        placeholder="Search descriptions/types/dates…"
                        value={globalSearch}
                        onChange={e => setGlobalSearch(e.target.value)}
                    />
                    <Button onClick={onOpen}>Advanced Filters</Button>
                </HStack>
                <Button
                    leftIcon={<AddIcon />}
                    colorScheme="green"
                    onClick={() => { setEditTx(undefined); openModal() }}
                >Add Transaction</Button>
            </Flex>

            <Table variant="striped" size="sm">
                <Thead>
                    <Tr>
                        {(['date', 'type', 'description', 'amount'] as (keyof Transaction)[]).map(col => (
                            <Th key={col}>
                                <Flex align="center">
                                    <Text mr={1}>{col.toUpperCase()}</Text>
                                    <IconButton
                                        aria-label="sort"
                                        size="xs"
                                        icon={sortDir === 'asc' && sortBy === col ? <ChevronUpIcon /> : <ChevronDownIcon />}
                                        onClick={() => toggleSort(col)}
                                    />
                                </Flex>
                            </Th>
                        ))}
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {pageData.map(tx => (
                        <Tr key={tx._id}>
                            <Td>{tx.date.split('T')[0]}</Td>
                            <Td>{tx.type}</Td>
                            <Td>{tx.description}</Td>
                            <Td>${tx.amount}</Td>
                            <Td>
                                <HStack spacing={2}>
                                    <IconButton
                                        size="xs"
                                        aria-label="edit"
                                        icon={<EditIcon />}
                                        onClick={() => { setEditTx(tx); openModal() }}
                                    />
                                    <IconButton
                                        size="xs"
                                        aria-label="delete"
                                        icon={<DeleteIcon />}
                                        colorScheme="red"
                                        onClick={async () => {
                                            if (!window.confirm('Delete this transaction?')) return
                                            await api.delete(`/transactions/${tx._id}`)
                                            onRefresh()
                                        }}
                                    />
                                </HStack>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>

            {/* pagination */}
            <Flex mt={4} justify="center" align="center">
                <Button
                    size="sm"
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    isDisabled={page === 1}
                >Prev</Button>
                <Text mx={4}>Page {page} / {pageCount}</Text>
                <Button
                    size="sm"
                    onClick={() => setPage(p => Math.min(pageCount, p + 1))}
                    isDisabled={page === pageCount}
                >Next</Button>
            </Flex>

            <FilterDrawer
                isOpen={isOpen}
                onClose={onClose}
            // you’ll need to pass/set filter state/handlers here
            />

            <AddEditTransactionModal
                isOpen={isModalOpen}
                onClose={closeModal}
                initialData={editTx}
                onSuccess={onRefresh}
            />
        </Box>
    )
}
