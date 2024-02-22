import useTime from "./useTime";
import * as S from "./styles";

function Clock() {
  const time = useTime();
  return (
    <div>
      <S.Wrapper>
        <S.Clock>
          <S.HourHand rotation={time.hours} />
          <S.MinuteHand rotation={time.minutes} />
          <S.SecondHand rotation={time.seconds} />
        </S.Clock>
      </S.Wrapper>
      <div>{time.fullTime}</div>
    </div>
  );
}

export default Clock;
