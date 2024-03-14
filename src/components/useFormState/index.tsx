import { useFormState } from "react-dom";

const addMessage = (previousState: string, formData: FormData) => {
    const message = formData.get(`message`) as string;

    return new Promise<string>((resolve) => setTimeout(() => {
        resolve(previousState + ` ` + message)
    }, 1000));
}

const UseFormStateComponent = () => {
    const [state, formAction] = useFormState<string, FormData>(addMessage, ``);

    return (
        <>
            <p>{state}</p>
            <form action={formAction}>
                <input type="text" name="message" />
                <button type="submit">Add Message</button>
            </form>
        </>
    );
}

export default UseFormStateComponent;