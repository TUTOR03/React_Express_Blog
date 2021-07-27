import { MAIN, MAIN_GREY, SUB_GREY, WHITE } from "@assets/colors"
import styled from "styled-components"

export const LoginPageCard = styled.div`
    max-width: 480px;
    min-width: 400px;
    height:60%;
    background-color: ${WHITE};
    padding: 2em 3.25em;
`

export const CardTitle = styled.h1`
    color: ${MAIN_GREY};
    height: 20%;
`

export const CardForm = styled.form`
    width:100%;
    height:55%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

export const CardInputContainer = styled.div`
    position: relative;
    width: 100%;
`

export const CardInput = styled.input`
    width:100%;
    padding: 0.5em .75em;
    font-size: 1.25em;
    box-sizing: border-box;
    border: none;
    outline: none;

    &:focus{
        outline: none;
    }

    &.custom{
        border-bottom: 3px solid ${MAIN};
        color: ${MAIN};
        padding-bottom: .25em;
        padding-left: 0;
    }

    &.custom::placeholder{
        color: transparent;
    }

    &.custom:placeholder-shown ~ label{
        cursor: text;
        bottom: calc(0.25em + 3px);
        font-size: 1.25em;
    }

    &.custom:focus ~ label{
        bottom: calc(2.15em + 3px);
        font-size:1em;
    }
`

export const CardInputLabel = styled.label`
    position: absolute;
    display: block;
    color: ${SUB_GREY};
    bottom: calc(2.15em + 3px);
    transition: 0.3s;
`

export const CardButton = styled.button`
    padding: 0.5em 1em;
    border: none;
    appearance: none;
    cursor: pointer;
    font-size:1.25em;

    &.custom{
        background-color: ${MAIN};
        color: ${WHITE};
        border: 1px solid ${MAIN};
        transition: all .3s;
    }

    &.custom:hover{
        background-color: ${WHITE};
        color: ${MAIN}
    }

`