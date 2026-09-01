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

    const [degreeId, setDegreeId] = useState('');
    const [revokeLoading, setRevokeLoading] = useState(false);
    const [revokeError, setRevokeError] = useState('');
    const [revokeSuccess, setRevokeSuccess] = useState('');

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
    }, [contract, loadUniversities]);


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
            setError(err.reason || 'Invalid input');
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
            setError(err.reason || 'Invalid input');
        } finally {
            setLoading(false);
        }
    }

    const revokeDegree = async () => {
        if (!degreeId) {
            setRevokeError('Please enter a degree ID');
            return;
        }
        try {
            setRevokeLoading(true);
            setRevokeError('');
            setRevokeSuccess('');
            const tx = await contract.revokeDegree(degreeId);
            await tx.wait();
            setRevokeSuccess('Degree revoked successfully');
            setDegreeId('');
        } catch (err) {
            setRevokeError(err.reason || 'Transaction failed');
        } finally {
            setRevokeLoading(false);
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
                <h2>Revoke a Degree</h2>
                <div style={{display: 'flex', gap: '12px', alignItems: 'center'}}>
                    <input
                        type="number"
                        placeholder="Degree ID"
                        value={degreeId}
                        onChange={(e) => setDegreeId(e.target.value)}
                        style={{flex: 1, marginBottom: 0}}
                        onKeyDown={(e) => e.key === 'Enter' && revokeDegree()}
                    />
                    <button
                        onClick={revokeDegree}
                        disabled={revokeLoading}
                        style={{backgroundColor: '#ff6b6b', marginBottom: 0, whiteSpace: 'nowrap'}}>
                        {revokeLoading ? 'Processing...' : 'Revoke Degree'}
                    </button>
                </div>
                {revokeError && <p className="error">{revokeError}</p>}
                {revokeSuccess && <p className="success">{revokeSuccess}</p>}
            </div>

            <div className="card">
                <h2>Registered Universities</h2>
                {universities.length === 0
                    ? <p style={{color: '#a0a0c0'}}>No universities registered yet</p>
                    : universities.map((address, index) => (
                        <div key={index} style={{
    padding: '12px',
    marginBottom: '8px',
    backgroundColor: '#eef2f6',
    borderRadius: '8px',
    color: '#0d2b4e'
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