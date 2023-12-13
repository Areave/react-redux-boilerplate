import React, {useState} from 'react'
import './toastTemplate.scss'
import Toast from "react-bootstrap/Toast";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ImageOK from '../../assets/images/ok.png'
import ImageError from '../../assets/images/error.png'
import {toastTimeout} from "../../public.config";
import {messageTypes} from "../../utils/enums";

export const ToastTemplate: React.FC<any> = ({text, type}) => {
    const [show, setShow] = useState(true);
    const getMessageForMessage = (type: string) => {
        if (type === messageTypes.ERROR) {
            return ImageError;
        } else if (type === messageTypes.MESSAGE) {
            return ImageOK;
        } else {
            return ImageOK;
        }
    };
    if (!text) {
        text = 'Undefined Error'
    }
    const closeToast = () => setShow(false);

    return <Row className='toast_comp mw-100'>
            <Col>
                <Toast className='toast_custom' onClose={closeToast} show={show} delay={toastTimeout} autohide
                onClick={closeToast}>
                    <Toast.Header className='toast-header_custom p-2 pe-4 d-flex justify-content-between'>
                        <div className="">
                            <img src={getMessageForMessage(type)}
                                 className="rounded"
                                 alt=""/>
                        </div>
                        <strong className="m-auto fs-5 flex-shrink-1 text-center">{text}</strong>
                    </Toast.Header>
                </Toast>
            </Col>
        </Row>
};