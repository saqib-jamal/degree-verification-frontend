import React from 'react';
import { Link } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';

function Navbar() {
    const { account, connectWallet } = useWeb3();

    const linkStyle = {
        color: '#a0a0c0',
        textDecoration: 'none',
        padding: '8px 16px',
        borderRadius: '6px',
        backgroundColor: '#1a1a2e'
    };

    return (
        <nav style={{
            backgroundColor: '#16213e',
            padding: '16px 40px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #2a2a4a',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            <div style={{display: 'flex', gap: '12px'}}>
                <Link to="/" style={linkStyle}>Home</Link>
                <Link to="/owner" style={linkStyle}>Owner</Link>
                <Link to="/university" style={linkStyle}>University</Link>
                <Link to="/student" style={linkStyle}>Student</Link>
            </div>
            {account 
                ? <span style={{color: '#6c63ff', fontSize: '0.9rem'}}>
                    Connected: {account.slice(0,6)}...{account.slice(-4)}
                  </span>
                : <button onClick={connectWallet}>Connect Wallet</button>
            }
        </nav>
    );
}

export default Navbar;