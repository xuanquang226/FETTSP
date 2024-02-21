import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
interface IProps {
    showModalCreate: boolean;
    setShowModalCreate: (v: boolean) => void;
}

function CreateModal(props: IProps) {
    const { showModalCreate, setShowModalCreate } = props;

    const [name, setName] = useState<string>("");
    const [author, setAuthor] = useState<string>("");

    const handleSubmit = () => {

        if (!name || !author) {
            toast.error("Name or author is not empty");
            return;
        }
        fetch("http://localhost:8080/book", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json, text/plain, */*"
            },
            body: JSON.stringify({ name, author })
        }).then((res) => res.json())
            .then(res => {
                if (res) toast.success("Save succeed !!!")
            })

        handleCloseModal();
        mutate("http://localhost:8080/book");
    }

    const handleCloseModal = () => {
        setName("");
        setAuthor("");
        setShowModalCreate(false);
    }

    return (
        <>

            <Modal
                show={showModalCreate}
                onHide={() => handleCloseModal()}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label>Name</Form.Label>
                            <Form.Control as="textarea" rows={1} placeholder="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Author</Form.Label>
                            <Form.Control as="textarea" rows={1} placeholder='author'
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModal()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmit()}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreateModal;