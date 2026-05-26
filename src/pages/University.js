import React, { useState } from 'react';
import { useWeb3 } from '../context/Web3Context';

function University() {
    const { contract, isUniversity, account } = useWeb3();
    const [studentAddress, setStudentAddress] = useState('');
    const [degreeName, setDegreeName] = useState('');
    const [major, setMajor] = useState('');
    const [degreeId, setDegreeId] = useState('');
    const [issueLoading, setIssueLoading] = useState(false);
    const [revokeLoading, setRevokeLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    if (!account) {
        return (
            <div className="page-container">
                <h1>Please connect your wallet</h1>
            </div>
        );
    }

    if (!isUniversity) {
        return (
            <div className="page-container">
                <h1>Access Denied — Registered universities only</h1>
            </div>
        );
    }

    const issueDegree = async () => {
        if (!studentAddress || !degreeName || !major) {
            setError('Please fill in all fields');
            return;
        }
        try {
            setIssueLoading(true);
            setError('');
            setSuccess('');
            const tx = await contract.issueDegree(studentAddress, degreeName, major);
            await tx.wait();
            setSuccess('Degree issued successfully');
            setStudentAddress('');
            setDegreeName('');
            setMajor('');
        } catch (err) {
            setError(err.reason || 'Transaction failed');
        } finally {
            setIssueLoading(false);
        }
    }

    const revokeDegree = async () => {
        if (!degreeId) {
            setError('Please enter a degree ID');
            return;
        }
        try {
            setRevokeLoading(true);
            setError('');
            setSuccess('');
            const tx = await contract.revokeDegree(degreeId);
            await tx.wait();
            setSuccess('Degree revoked successfully');
            setDegreeId('');
        } catch (err) {
            setError(err.reason || 'Transaction failed');
        } finally {
            setRevokeLoading(false);
        }
    }

    return (
        <div className="page-container">
            <h1>University Dashboard</h1>

            <div className="card">
                <h2>Issue a Degree</h2>
                <input
                    type="text"
                    placeholder="Student Wallet Address"
                    value={studentAddress}
                    onChange={(e) => setStudentAddress(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && issueDegree()}

                />
                <div style={{display: 'flex', gap: '12px'}}>
                    <input
                        type="text"
                        placeholder="Degree Name"
                        value={degreeName}
                        onChange={(e) => setDegreeName(e.target.value)}
                        style={{flex: 1}}
                    />
                    <input
                        type="text"
                        placeholder="Major"
                        value={major}
                        onChange={(e) => setMajor(e.target.value)}
                        style={{flex: 1}}
                    />
                </div>
                <button onClick={issueDegree} disabled={issueLoading}>
                {issueLoading ? 'Processing...' : 'Issue Degree'}
                </button>
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
                    <button>
                             onClick={revokeDegree} 
                             disabled={revokeLoading}
                        style={{backgroundColor: '#ff6b6b', marginBottom: 0, whiteSpace: 'nowrap'}}
                        
                       {revokeLoading ? 'Processing...' : 'Revoke Degree'}
                    </button>
                </div>
            </div>

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
        </div>
    );
}

export default University;