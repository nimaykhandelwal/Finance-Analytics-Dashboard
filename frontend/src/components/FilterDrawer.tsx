import React from 'react'
import {
    Drawer, DrawerOverlay, DrawerContent, DrawerHeader,
    DrawerBody, DrawerFooter, Button, FormControl,
    FormLabel, Input, HStack, Select
} from '@chakra-ui/react'

interface Props {
    isOpen: boolean
    onClose: () => void
    // you’ll probably want callbacks like onChangeFilters(filters)
}

export const FilterDrawer: React.FC<Props> = ({ isOpen, onClose }) => {
    return (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader>Advanced Filters</DrawerHeader>
                <DrawerBody>
                    <FormControl mb={4}>
                        <FormLabel>Type</FormLabel>
                        <Select placeholder="Any">
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </Select>
                    </FormControl>
                    <HStack mb={4}>
                        <FormControl>
                            <FormLabel>Date from</FormLabel>
                            <Input type="date" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Date to</FormLabel>
                            <Input type="date" />
                        </FormControl>
                    </HStack>
                    <HStack>
                        <FormControl>
                            <FormLabel>Min Amount</FormLabel>
                            <Input type="number" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Max Amount</FormLabel>
                            <Input type="number" />
                        </FormControl>
                    </HStack>
                </DrawerBody>
                <DrawerFooter>
                    <Button mr={3} onClick={onClose}>Cancel</Button>
                    <Button colorScheme="blue">Apply</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
