import React, { useCallback, useState } from 'react';
import BambooCard from 'components/modules/bamboo/bambooCard/bambooCard';
import {
  PageTitle,
  Lines,
  LineTop,
  LineBottom,
} from '../../atoms/pageTitle/pageTitle.style';
import { WriteButton, ButtonWrap, TitleWrap } from './bambooTemplate.style';
import { useNavigate } from 'react-router-dom';
import { CardWrap } from 'components/modules/bamboo/bambooCard/bambooCard.style';

function BambooTemplate() {
  const navigate = useNavigate();

  return (
    <>
      <TitleWrap>
        <PageTitle>
          Bamboo
          <br />
          Grove
        </PageTitle>
      </TitleWrap>
      <ButtonWrap>
        <WriteButton onClick={() => navigate('posting')}>글쓰기</WriteButton>
      </ButtonWrap>
      <Lines>
        <LineTop />
        <LineBottom />
      </Lines>
      <CardWrap>
        <BambooCard />
      </CardWrap>
    </>
  );
}

export default BambooTemplate;
