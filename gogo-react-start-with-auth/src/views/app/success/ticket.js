/* eslint-disable new-cap */
/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from '@david.kucsai/react-pdf-table';

const styles = StyleSheet.create({
  page: { backgroundColor: 'white', padding: 10 },
  table: { borderRadius: 5 },
  section: {
    backgroundColor: 'white',
    color: 'white',
    textAlign: 'center',
    margin: 30,
  },
});

const Ticket = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Table
          data={[
            {
              firstName: 'John',
              lastName: 'Smith',
              dob: new Date(2000, 1, 1),
              country: 'Australia',
              phoneNumber: 'xxx-0000-0000',
            },
            {
              firstName: 'Johnsdsdsdsdsdsdds',
              lastName: 'Smith',
              dob: new Date(2000, 1, 1),
              country: 'Australia',
              phoneNumber: 'xxx-0000-0000',
            },
          ]}
        >
          <TableHeader textAlign={'center'}>
            <TableCell style={styles.table} weighting={0.3}>
              Producto
            </TableCell>
            <TableCell weighting={0.3}>Nota Especial</TableCell>
            <TableCell> Cantidad </TableCell>
            <TableCell>Subtotal </TableCell>
          </TableHeader>
          <TableBody>
            <DataTableCell weighting={0.3} getContent={(r) => r.firstName} />
            <DataTableCell weighting={0.3} getContent={(r) => r.lastName} />
            <DataTableCell getContent={(r) => r.dob.toLocaleString()} />
            <DataTableCell getContent={(r) => r.country} />
          </TableBody>
        </Table>
      </Page>
    </Document>
  );
};

export default Ticket;
