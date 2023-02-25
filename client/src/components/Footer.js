import React from 'react';
import styled from 'styled-components';
import mailIcon from '../utils/img/mail.png';
import gitIcon from '../utils/img/git.png';
const FooterWraper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 200px;
  padding-top: 70px;
  padding-left: 30px;
  padding-right: 30px;
  background: linear-gradient(to bottom right, #344d67, #fff);
  border-top-left-radius: 70px;
`;
const Section = styled.div`
  color: #292929;
  width: 20%;
  p {
    font-size: 0.8rem;
  }
`;
const Title = styled.div`
  font-size: 1.2rem;
  font-family: Hind_Siliguri_Bold;
  color: #fff;
`;
const TitleLine = styled.div`
  width: 50px;
  height: 2px;
  margin-top: 8px;
  margin-bottom: 30px;
  background-color: #999;
`;
const Content = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 5px;
`;
const ContactIcon = styled.img`
  width: 25px;
  margin-right: 5px;
`;

const infoText =
  '공공데이터포털의 OpenAPI데이터 활용 및 카카오맵 API를 활용한 웹 어플리케이션으로 OpenAPI의 기업정보 데이터를 활용하여 카카오맵에 기업의 위치를 마커하고 마커에 기업정보를 담아 정보를 제공 한다.';

const Footer = () => {
  return (
    <FooterWraper>
      <Section>
        <Title>DeepData</Title>
        <TitleLine />
        <p>{`${infoText}`}</p>
      </Section>
      <Section>
        <Title>Product</Title>
        <TitleLine />
      </Section>
      <Section>
        <Title>Useful Link</Title>
        <TitleLine />
      </Section>
      <Section>
        <Title>Contact</Title>
        <TitleLine />
        <Content>
          <ContactIcon src={mailIcon} />
          <div>dev10.deepdata@gmail.com</div>
        </Content>
        <Content>
          <ContactIcon src={gitIcon} />
          <div>dev10DeepData</div>
        </Content>
      </Section>
    </FooterWraper>
  );
};

export default Footer;
