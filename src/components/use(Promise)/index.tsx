import { useState, use, Suspense } from 'react';


const fetchIntroduce = () => new Promise((resolve) => setTimeout(() => {
    resolve(`Hello, My name is geonil.`);
}, 3000));

const UsePromiseComponent = () => {
    const [introducePromise, setIntroducePromise] = useState(() => fetchIntroduce());

    const handleUpdate = () => {
        fetchIntroduce().then((Introduce) => {
            setIntroducePromise(Promise.resolve(Introduce));
        });
    };

    return (
        <>
            <button onClick={handleUpdate}>Refresh!</button>
            <ParentComponent IntroducePromise={introducePromise} />
        </>
    );
};

const ParentComponent = ({ IntroducePromise }) => {
    return (
        <Suspense fallback={<p>Is Loading...</p>}>
            <ChildComponent IntroducePromise={IntroducePromise} />
        </Suspense>
    )
}

const ChildComponent = ({ IntroducePromise }) => {
    const introduce = use<string>(IntroducePromise);

    return (
        <p>{introduce}</p>
    )
}

export default UsePromiseComponent;