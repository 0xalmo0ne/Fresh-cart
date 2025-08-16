/** @format */
import React from "react";
import styled from "styled-components";
import logo from "../../assets/freshcart-logo.svg";
import "framer-motion";

export default function Spinner1() {
	return (
		<StyledWrapper>
			<div id='page'>
				<div id='container'>
					<div id='ring'></div>
					<div id='ring'></div>
					<div id='ring'></div>
					<div id='ring'></div>
					<div id='h3'>
						<img src={logo} alt='loading logo' className='w-[500px]' />
					</div>
				</div>
			</div>
		</StyledWrapper>
	);
}

const StyledWrapper = styled.div`
	#page {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		background-color: #fff;
	}

	#container {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		width: 500px;
		height: 500px;
	}

	#h3 {
		color: white;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	#ring {
		width: 500px;
		height: 500px;
		border: 1px solid transparent;
		border-radius: 50%;
		position: absolute;
	}

	#ring:nth-child(1) {
		border-bottom: 8px solid rgb(255, 141, 249);
		animation: rotate1 2s linear infinite;
	}

	#ring:nth-child(2) {
		border-bottom: 8px solid rgb(255, 65, 106);
		animation: rotate2 2s linear infinite;
	}

	#ring:nth-child(3) {
		border-bottom: 8px solid rgb(0, 255, 255);
		animation: rotate3 2s linear infinite;
	}

	#ring:nth-child(4) {
		border-bottom: 8px solid rgb(252, 183, 55);
		animation: rotate4 2s linear infinite;
	}

	@keyframes rotate1 {
		from {
			transform: rotateX(50deg) rotateZ(110deg);
		}
		to {
			transform: rotateX(50deg) rotateZ(470deg);
		}
	}

	@keyframes rotate2 {
		from {
			transform: rotateX(20deg) rotateY(50deg) rotateZ(20deg);
		}
		to {
			transform: rotateX(20deg) rotateY(50deg) rotateZ(380deg);
		}
	}

	@keyframes rotate3 {
		from {
			transform: rotateX(40deg) rotateY(130deg) rotateZ(450deg);
		}
		to {
			transform: rotateX(40deg) rotateY(130deg) rotateZ(90deg);
		}
	}

	@keyframes rotate4 {
		from {
			transform: rotateX(70deg) rotateZ(270deg);
		}
		to {
			transform: rotateX(70deg) rotateZ(630deg);
		}
	}
`;
