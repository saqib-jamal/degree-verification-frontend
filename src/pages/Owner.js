import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../context/Web3Context';
/* eslint-disable react-hooks/exhaustive-deps */

function Owner() {
    const { contract, isOwner, account } = useWeb3();
    const [universityAddress, setUniversityAddress] = useState('');
    const [universities, setUniversities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');


    const loadUniversities = async () => {
        try {
            const list = await contract.getUniversities();
            setUniversities(list);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        if (contract) {
            loadUniversities();
        }
    }, [contract, loadUniversities]);//callled before declaration


    if (!account) {
        return (
            <div className="page-container">
                <h1>Please connect your wallet</h1>
            </div>
        );
    }

    if (!isOwner) {
        return (
            <div className="page-container">
                <h1>Access Denied — Owner only</h1>
            </div>
        );
    }

    const registerUniversity = async () => {
        if (!universityAddress) {
            setError('Please enter a university address');
            return;
        }
        try {
            setLoading(true);
            setError('');
            setSuccess('');
            const tx = await contract.registerUniversity(universityAddress);
            await tx.wait();
            setSuccess('University registered successfully');
            setUniversityAddress('');
            loadUniversities();
        } catch (err) {
            setError(err.reason || 'Transaction failed');
        } finally {
            setLoading(false);
        }
    }

    const removeUniversity = async () => {
        if (!universityAddress) {
            setError('Please enter a university address');
            return;
        }
        try {
            setLoading(true);
            setError('');
            setSuccess('');
            const tx = await contract.removeUniversity(universityAddress);
            await tx.wait();
            setSuccess('University removed successfully');
            setUniversityAddress('');
            loadUniversities();
        } catch (err) {
            setError(err.reason || 'Transaction failed (invalid input)');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="page-container">
            <h1>Owner Dashboard</h1>

            <div className="card">
                <h2>Manage Universities</h2>
                <div style={{display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px'}}>
                    <input
                        type="text"
                        placeholder="Enter University Address"
                        value={universityAddress}
                        onChange={(e) => setUniversityAddress(e.target.value)}
                        style={{flex: 1, marginBottom: 0}}
                        onKeyDown={(e) => e.key === 'Enter' && registerUniversity()}
                    />
                </div>
                <div style={{display: 'flex', gap: '12px'}}>
                    <button onClick={registerUniversity} disabled={loading}>
                        {loading ? 'Processing...' : 'Register University'}
                    </button>
                    <button
                        onClick={removeUniversity}
                        disabled={loading}
                        style={{backgroundColor: '#ff6b6b'}}
                    >
                        {loading ? 'Processing...' : 'Remove University'}
                    </button>
                </div>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
            </div>

            <div className="card">
                <h2>Registered Universities</h2>
                {universities.length === 0
                    ? <p style={{color: '#a0a0c0'}}>No universities registered yet</p>
                    : universities.map((address, index) => (
                        <div key={index} style={{
                            padding: '12px',
                            marginBottom: '8px',
                            backgroundColor: '#1a1a2e',
                            borderRadius: '8px',
                            color: '#6c63ff'
                        }}>
                            {index + 1}. {address}
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Owner;