import styled from "styled-components"
import { MAIN_BG_GREY } from "@assets/colors"

export const ContainerCenter = styled.div`
	height: 100vh;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	&.main_bg{
		background-color: ${MAIN_BG_GREY} 
	}
`