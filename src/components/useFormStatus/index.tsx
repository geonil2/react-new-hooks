import { useFormState, useFormStatus } from "react-dom";

const addMessage = (previousState: string, formData: FormData) => {
    const message = formData.get(`message`);
    
    return new Promise<string>((resolve) => setTimeout(() => {
        resolve(previousState + ` ` + message)
    }, 1000));
}

const UseFormStatusComponent = () => {
    const [state, formAction] = useFormState<string, FormData>(addMessage, ``);

    return (
        <>
            <p>{state}</p>
            <form action={formAction}>
                <input type="text" name="message" />
                <SubmitButton />
            </form>
        </>
    );
}

const SubmitButton = () => {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
        >
            {pending ? `loading` : `Add Message` }
        </button>
    );
}

export default UseFormStatusComponent;