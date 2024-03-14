import { createContext, use, useState } from 'react';

const initialState = {
    value: 'dark',
    handleChangeValue: () => {}
}

const ThemeContext = createContext(initialState);

const UseContextComponent = () => {
    const [value, setValue] = useState(`dark`);

    return (
        <ThemeContext.Provider value={{ value, handleChangeValue: () => setValue((prev) => prev === `dark` ? `white` : `dark`) }}>
            <ParentComponent />
        </ThemeContext.Provider>
    );
};

const ParentComponent = () => {
    const { value, handleChangeValue } = use(ThemeContext);

    return (
        <div style={{ backgroundColor : value === `dark` ? `black` : `white` }}>
            <button onClick={handleChangeValue}>Change Mode</button> 
            <ChildComponent />
        </div>
    )    
    
}

const ChildComponent = () => {
    if (use(ThemeContext).value === `dark`) {
        return <div style={{ color: `white` }}>Dark Mode</div>
    }

    return null;
}

export default UseContextComponent;