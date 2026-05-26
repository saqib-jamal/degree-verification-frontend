import React, { useState } from 'react';
import { useWeb3 } from '../context/Web3Context';

function Home() {
    const { contract } = useWeb3();
    const [degreeId, setDegreeId] = useState('');
    const [degree, setDegree] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const verifyDegree = async () => {
        if (!contract) {
            setError('Please connect your wallet first');
            return;
        }
        if (!degreeId) {
            setError('Please enter a degree ID');
            return;
        }
        try {
            setLoading(true);
            setError('');
            const result = await contract.verifyDegree(degreeId);
            setDegree(result);
        } catch (err) {
            setError('Degree not found or does not exist');
            setDegree(null);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="page-container">
            <h1>Verify a Degree</h1>

            <div style={{display: 'flex', gap: '12px', alignItems: 'center'}}>
                <input
                    type="number"
                    placeholder="Enter Degree ID"
                    value={degreeId}
                    onChange={(e) => setDegreeId(e.target.value)}
                    style={{flex: 1, marginBottom: 0}}
                    onKeyDown={(e) => e.key === 'Enter' && verifyDegree()}
                />
                <button onClick={verifyDegree} style={{marginBottom: 0, whiteSpace: 'nowrap'}}>
                    {loading ? 'Verifying...' : 'Verify'}
                </button>
            </div>

            {error && <p className="error">{error}</p>}

            {degree && (
                <div className="card" style={{marginTop: '24px'}}>
                    <p><span style={{color: '#a0a0c0'}}>Degree ID:</span> {degree.id.toString()}</p>
                    <p><span style={{color: '#a0a0c0'}}>Student:</span> {degree.student}</p>
                    <p><span style={{color: '#a0a0c0'}}>University:</span> {degree.issuingUniversity}</p>
                    <p><span style={{color: '#a0a0c0'}}>Degree:</span> {degree.degreeName}</p>
                    <p><span style={{color: '#a0a0c0'}}>Major:</span> {degree.major}</p>
                    <p><span style={{color: '#a0a0c0'}}>Date Issued:</span> {new Date(Number(degree.dateIssued) * 1000).toLocaleDateString()}</p>
                    <p className={degree.isValid ? 'valid' : 'revoked'}>
                        {degree.isValid ? '✓ VALID' : '✗ REVOKED'}
                    </p>
                </div>
            )}
        </div>
    );
}

export default Home;