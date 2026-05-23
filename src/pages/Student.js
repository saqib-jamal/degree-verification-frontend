import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../context/Web3Context';
/* eslint-disable react-hooks/exhaustive-deps */

function Student() {
    const { contract, account } = useWeb3();
    const [degrees, setDegrees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (contract && account) {
            loadDegrees();
        }
    }, [contract, account, loadDegrees]);//missing dependency loadDegrees

    const loadDegrees = async () => {
        try {
            setLoading(true);
            const degreeIds = await contract.getStudentDegrees(account);
            const degreeDetails = await Promise.all(
                degreeIds.map(id => contract.verifyDegree(id))
            );
            setDegrees(degreeDetails);
        } catch (err) {
            setError('Failed to load degrees');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    if (!account) {
        return (
            <div className="page-container">
                <h1>Please connect your wallet</h1>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="page-container">
                <h1>Loading your degrees...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="page-container">
                <p className="error">{error}</p>
            </div>
        );
    }

    return (
        <div className="page-container">
            <h1>Student Dashboard</h1>
            <p style={{color: '#6c63ff', marginBottom: '24px', textAlign: 'center', fontSize: '0.9rem'}}>
                {account}
            </p>

            {degrees.length === 0
                ? <div className="card" style={{textAlign: 'center'}}>
                    <p style={{color: '#a0a0c0'}}>No degrees found for this wallet</p>
                  </div>
                : degrees.map((degree, index) => (
                    <div className="card" key={index}>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'}}>
                            <h2 style={{margin: 0}}>Degree #{degree.id.toString()}</h2>
                            <span className={degree.isValid ? 'valid' : 'revoked'}>
                                {degree.isValid ? '✓ VALID' : '✗ REVOKED'}
                            </span>
                        </div>
                        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px'}}>
                            <div>
                                <p style={{color: '#a0a0c0', fontSize: '0.8rem', marginBottom: '4px'}}>Degree Name</p>
                                <p>{degree.degreeName}</p>
                            </div>
                            <div>
                                <p style={{color: '#a0a0c0', fontSize: '0.8rem', marginBottom: '4px'}}>Major</p>
                                <p>{degree.major}</p>
                            </div>
                            <div>
                                <p style={{color: '#a0a0c0', fontSize: '0.8rem', marginBottom: '4px'}}>Date Issued</p>
                                <p>{new Date(Number(degree.dateIssued) * 1000).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p style={{color: '#a0a0c0', fontSize: '0.8rem', marginBottom: '4px'}}>Issued By</p>
                                <p style={{fontSize: '0.85rem', color: '#6c63ff'}}>
                                    {degree.issuingUniversity.slice(0,6)}...{degree.issuingUniversity.slice(-4)}
                                </p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Student;


