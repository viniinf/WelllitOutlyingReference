// src/components/Suppliers/SupplierList.js

import React, { useEffect, useState } from 'react';
import { getSuppliers } from '../../services/firebase';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      const data = await getSuppliers();
      setSuppliers(data);
    };

    fetchSuppliers();
  }, []);

  return (
    <div>
      {suppliers.map((supplier) => (
        <div key={supplier.id}>{supplier.name}</div>
      ))}
    </div>
  );
};

export default SupplierList;
