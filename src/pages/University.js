
import React, { useState } from 'react';
import { useWeb3 } from '../context/Web3Context';

function University() {
    const { contract, isUniversity, account } = useWeb3();
    const [studentAddress, setStudentAddress] = useState('');
    const [degreeName, setDegreeName] = useState('');
    const [major, setMajor] = useState('');
    const [studentName, setStudentName] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [regNumber, setRegNumber] = useState('');
    const [issueLoading, setIssueLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const issueDegree = async () => {
        if (!studentAddress || !degreeName || !major || !studentName || !fatherName || !regNumber) {
            setError('Please fill in all fields');
            return;
        }
        try {
            setIssueLoading(true);
            setError('');
            setSuccess('');

            const cleanRegNumber = regNumber.replace(/-/g, ''); // strip dashes before sending on-chain

            const tx = await contract.issueDegree(
                studentAddress,
                degreeName,
                major,
                studentName,
                fatherName,
                cleanRegNumber
            );
            await tx.wait();
            setSuccess('Degree issued successfully');
            setStudentAddress('');
            setDegreeName('');
            setMajor('');
            setStudentName('');
            setFatherName('');
            setRegNumber('');
        } catch (err) {
            setError(err.reason || 'Transaction failed (invalid address)');
        } finally {
            setIssueLoading(false);
        }
    }

    return (
        <div className="page-container">
            {!account 
                ? <h1>Please connect your wallet</h1>
                : !isUniversity 
                ? <h1>Access Denied — Registered universities only</h1>
                : (
                    <>
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
                                    onKeyDown={(e) => e.key === 'Enter' && issueDegree()}
                                />
                                <input
                                    type="text"
                                    placeholder="Major"
                                    value={major}
                                    onChange={(e) => setMajor(e.target.value)}
                                    style={{flex: 1}}
                                    onKeyDown={(e) => e.key === 'Enter' && issueDegree()}
                                />
                            </div>
                            <input
                                type="text"
                                placeholder="Student Name"
                                value={studentName}
                                onChange={(e) => setStudentName(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && issueDegree()}
                            />
                            <input
                                type="text"
                                placeholder="Father Name"
                                value={fatherName}
                                onChange={(e) => setFatherName(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && issueDegree()}
                            />
                            <input
                                type="text"
                                placeholder="Registration Number (e.g. 2019-0273849)"
                                value={regNumber}
                                onChange={(e) => setRegNumber(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && issueDegree()}
                            />
                            <button onClick={issueDegree} disabled={issueLoading}>
                                {issueLoading ? 'Processing...' : 'Issue Degree'}
                            </button>
                        </div>

                        {error && <p className="error">{error}</p>}
                        {success && <p className="success">{success}</p>}
                    </>
                )
            }
        </div>
    );
}

export default University;