import UseContextComponent from "./components/use(Context)";
import UsePromiseComponent from "./components/use(Promise)";
import UseFormStateComponent from "./components/useFormState";
import UseFormStatusComponent from "./components/useFormStatus";
import UseOptimisticComponent from "./components/useOptimistic";

const App = () => {
    return (
        <>
            {/* NOTE : use(Promise)  */}
            <UsePromiseComponent />
            <BorderBox/>
            {/* NOTE : use(Context)  */}
            <UseContextComponent />
            <BorderBox/>
            {/* NOTE : useFormState */}
            <UseFormStateComponent />
            <BorderBox/>
            {/* NOTE : useFormStatus */}
            <UseFormStatusComponent />
            <BorderBox/>
            {/* NOTE : useOptimistic */}
            <UseOptimisticComponent />
            <BorderBox/>
        </>
    )
}

const BorderBox = () => {
    return (
        <div style={{ height: `2px`, backgroundColor: `gray`, margin: '20px 0px' }}></div>
    )
}

export default App;