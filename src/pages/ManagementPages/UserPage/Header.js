import React from 'react';

function Header({ setIsAdding, nameBoard }) {
    return (
        <header>
            <h1>{nameBoard} Management</h1>
            <div style={{ marginTop: '30px', marginBottom: '18px' }}>
                <button onClick={() => setIsAdding(true)} className="round-button">
                    Add {nameBoard}
                </button>
            </div>
        </header>
    );
}

export default Header;
