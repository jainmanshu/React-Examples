import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
`;

export const Clock = styled.div`
  height: 400px;
  width: 400px;
  border: 2px solid salmon;
  border-radius: 50%;
`;

const hand = `
  height: 5px;
  width: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
`;

const after = `
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
`;

export const HourHand = styled.div<{ rotation: number }>`
  ${hand}
  transform: rotate(${(p) => p.rotation}deg);
  &:after {
    height: 175px;
    width: 5px;
    background-color: aliceblue;
    ${after}
  }
`;

export const MinuteHand = styled.div<{ rotation: number }>`
  ${hand}
  transform: rotate(${(p) => p.rotation}deg);
  &:after {
    height: 150px;
    width: 3px;
    background-color: goldenrod;
    ${after}
  }
`;

export const SecondHand = styled.div<{ rotation: number }>`
  ${hand}
  transform: rotate(${(p) => p.rotation}deg);
  &:after {
    background-color: purple;
    height: 125px;
    width: 1px;
    ${after}
  }
`;
