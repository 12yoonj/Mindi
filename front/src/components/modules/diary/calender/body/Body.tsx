import React, { useState } from 'react';
import { useGetDiaryList } from 'hooks/diaryQuery';
import { CalenderBodyProps } from 'types/atoms';
import { selectMaxSentiment, getDateForString } from 'utils/utils';
import { Container, Days, Day, Span } from './Body.style';
function Body({ totalDate, year, month, TODAY }: CalenderBodyProps) {
  const date = getDateForString(year, month, 0);
  const { diary, isFetching } = useGetDiaryList(
    `${year}`,
    `${date.slice(5, 7)}`,
    '00',
  );
  let count = diary?.length - 1;

  return (
    <Container>
      {totalDate?.map((days, index) => {
        const dataKey = `${year}-${month}-${index}`;
        return (
          <Days key={dataKey}>
            {days?.map((day, i) => {
              const dataKey = `${year}-${month}-${i}`;
              const curKey = `${year}-${
                month >= 10 ? month : `0${month}`
              }-${day}`;

              let sentiment;
              if (diary && curKey === diary[count]?.diaryDate) {
                sentiment = selectMaxSentiment(diary[count--]?.sentiment);
              } else {
                sentiment = 'none';
              }

              return (
                <Day
                  isToday={curKey === TODAY ? true : false}
                  isNull={day.length === 0 ? true : false}
                  sentiment={sentiment}
                  key={dataKey}
                >
                  <Span>{day}</Span>
                </Day>
              );
            })}
          </Days>
        );
      })}
    </Container>
  );
}

export default React.memo(Body);
