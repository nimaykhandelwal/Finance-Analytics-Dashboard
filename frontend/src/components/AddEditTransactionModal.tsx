import React, { useEffect } from 'react'
import {
    Modal, ModalOverlay, ModalContent, ModalHeader,
    ModalFooter, ModalBody, ModalCloseButton,
    Button, FormControl, FormLabel, Input, Select, useToast
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import api from '../api/axios'
import { Transaction } from './TransactionTable'

interface Props {
    isOpen: boolean
    onClose: () => void
    initialData?: Transaction
    onSuccess: () => void
}

export const AddEditTransactionModal: React.FC<Props> = ({
    isOpen, onClose, initialData, onSuccess
}) => {
    const toast = useToast()
    const form = useForm<Partial<Transaction>>({
        defaultValues: initialData || { type: 'income' }
    })

    useEffect(() => {
        form.reset(initialData || { type: 'income' })
    }, [initialData])

    const submit = form.handleSubmit(async data => {
        try {
            if (initialData) {
                await api.put(`/transactions/${initialData._id}`, data)
            } else {
                await api.post('/transactions', data)
            }
            toast({
                status: 'success',
                title: initialData ? 'Updated' : 'Created'
            })
            onSuccess()
            onClose()
        } catch (err: any) {
            toast({ status: 'error', title: err.message })
        }
    })

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{initialData ? 'Edit' : 'Add'} Transaction</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl mb={3}>
                        <FormLabel>Date</FormLabel>
                        <Input type="date" {...form.register('date')} />
                    </FormControl>
                    <FormControl mb={3}>
                        <FormLabel>Type</FormLabel>
                        <Select {...form.register('type')}>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </Select>
                    </FormControl>
                    <FormControl mb={3}>
                        <FormLabel>Amount</FormLabel>
                        <Input type="number" step="0.01" {...form.register('amount', { valueAsNumber: true })} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Input {...form.register('description')} />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button mr={3} onClick={onClose}>Cancel</Button>
                    <Button colorScheme="blue" onClick={submit}>
                        {initialData ? 'Update' : 'Create'}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
