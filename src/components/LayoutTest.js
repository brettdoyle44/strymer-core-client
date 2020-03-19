import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 50px 1fr 50px;
  grid-template-areas:
    'header'
    'main';
  height: 100vh;

  @media (min-width: 46.875em) {
    grid-template-columns: 240px 1fr;
    grid-template-areas:
      'sidenav header'
      'sidenav main';
  }
`;

const Header = styled.header`
  grid-area: header;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background-color: #648ca6;
`;

const Search = styled.div`
  margin-left: 42px;
`;

const Profile = styled.div``;

const SideNav = styled.aside`
  grid-area: sidenav;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 240px;
  position: fixed;
  overflow-y: auto;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08);
  z-index: 2;
  background-color: #394263;
  transition: all 0.6s ease-in-out;
  ${props =>
    props.active
      ? css`
          transform: 'translateX(0)';
        `
      : css`
          transform: translateX(-245px);
        `}

  @media (min-width: 46.875em) {
    position: fixed;
    transform: translateX(0);
  }
`;

const SideNavList = styled.ul`
  padding: 0;
  margin-top: 85px;
  list-style-type: none;
`;

const NavListItem = styled.li`
  padding: 20px 20px 20px 40px;
  color: #ddd;
  &hover: {
    background-color: rgba(255, 255, 255, 0.2);
    cursor: pointer;
  }
`;

const Content = styled.main`
  grid-area: main;
  background-color: #8fd4d9;
`;

const PodcastContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(265px, 1fr));
  grid-auto-rows: 94px;
  grid-gap: 20px;
  margin: 20px;
`;

const PodcastCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: #d3d3;
`;

const MenuIcon = styled.div`
  position: fixed;
  display: flex;
  top: 5px;
  left: 10px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  z-index: 1;
  cursor: pointer;
  padding: 12px;
  background-color: #dadae3;
`;

const SideNavClose = styled.div`
  position: absolute;
  visibility: visible;
  top: 8px;
  right: 12px;
  cursor: pointer;
  font-size: 20px;
  color: #ddd;

  @media (min-width: 46.875em) {
    visibility: hidden;
  }
`;

export default function LayoutTest() {
  const [isActive, setActive] = useState(false);

  function handleClick() {
    if (isActive === false) {
      setActive(true);
    } else {
      setActive(false);
    }
  }

  return (
    <GridContainer>
      <MenuIcon onClick={handleClick}>
        <FaBars onClick={handleClick} />
      </MenuIcon>
      <Header>
        <Search>Search...</Search>
        <Profile>My Face</Profile>
      </Header>
      <SideNav active={isActive}>
        <SideNavClose onClick={handleClick}>
          <FaTimes onClick={handleClick} />
        </SideNavClose>
        <SideNavList>
          <NavListItem>Item 1</NavListItem>
          <NavListItem>Item 2</NavListItem>
          <NavListItem>Item 3</NavListItem>
          <NavListItem>Item 4</NavListItem>
          <NavListItem>Item 5</NavListItem>
        </SideNavList>{' '}
      </SideNav>
      <Content>
        <PodcastContainer>
          <PodcastCard>
            <div>Hello</div>
            <div>Again</div>
          </PodcastCard>
          <PodcastCard>
            <div>Hello</div>
            <div>Again</div>
          </PodcastCard>
          <PodcastCard>
            <div>Hello</div>
            <div>Again</div>
          </PodcastCard>
          <PodcastCard>
            <div>Hello</div>
            <div>Again</div>
          </PodcastCard>
          <PodcastCard>
            <div>Hello</div>
            <div>Again</div>
          </PodcastCard>
          <PodcastCard>
            <div>Hello</div>
            <div>Again</div>
          </PodcastCard>
          <PodcastCard>
            <div>Hello</div>
            <div>Again</div>
          </PodcastCard>
          <PodcastCard>
            <div>Hello</div>
            <div>Again</div>
          </PodcastCard>
          <PodcastCard>
            <div>Hello</div>
            <div>Again</div>
          </PodcastCard>
          <PodcastCard>
            <div>Hello</div>
            <div>Again</div>
          </PodcastCard>
          <PodcastCard>
            <div>Hello</div>
            <div>Again</div>
          </PodcastCard>
          <PodcastCard>
            <div>Hello</div>
            <div>Again</div>
          </PodcastCard>
          <PodcastCard>
            <div>Hello</div>
            <div>Again</div>
          </PodcastCard>
          <PodcastCard>
            <div>Hello</div>
            <div>Again</div>
          </PodcastCard>
          <PodcastCard>
            <div>Hello</div>
            <div>Again</div>
          </PodcastCard>
          <PodcastCard>
            <div>Hello</div>
            <div>Again</div>
          </PodcastCard>
          <PodcastCard>
            <div>Hello</div>
            <div>Again</div>
          </PodcastCard>
          <PodcastCard>
            <div>Hello</div>
            <div>Again</div>
          </PodcastCard>
          <PodcastCard>
            <div>Hello</div>
            <div>Again</div>
          </PodcastCard>
          <PodcastCard>
            <div>Hello</div>
            <div>Again</div>
          </PodcastCard>
          <PodcastCard>
            <div>Hello</div>
            <div>Again</div>
          </PodcastCard>
          <PodcastCard>
            <div>Hello</div>
            <div>Again</div>
          </PodcastCard>
          <PodcastCard>
            <div>Hello</div>
            <div>Again</div>
          </PodcastCard>
          <PodcastCard>
            <div>Hello</div>
            <div>Again</div>
          </PodcastCard>
          <PodcastCard>
            <div>Hello</div>
            <div>Again</div>
          </PodcastCard>
          <PodcastCard>
            <div>Hello</div>
            <div>Again</div>
          </PodcastCard>
          <PodcastCard>
            <div>Hello</div>
            <div>Again</div>
          </PodcastCard>
          <PodcastCard>
            <div>Hello</div>
            <div>Again</div>
          </PodcastCard>
          <PodcastCard>
            <div>Hello</div>
            <div>Again</div>
          </PodcastCard>
          <PodcastCard>
            <div>Hello</div>
            <div>Again</div>
          </PodcastCard>
          <PodcastCard>
            <div>Hello</div>
            <div>Again</div>
          </PodcastCard>
          <PodcastCard>
            <div>Hello</div>
            <div>Again</div>
          </PodcastCard>
          <PodcastCard>
            <div>Hello</div>
            <div>Again</div>
          </PodcastCard>
          <PodcastCard>
            <div>Hello</div>
            <div>Again</div>
          </PodcastCard>
          <PodcastCard>
            <div>Hello</div>
            <div>Again</div>
          </PodcastCard>
          <PodcastCard>
            <div>Hello</div>
            <div>Again</div>
          </PodcastCard>
          <PodcastCard>
            <div>Hello</div>
            <div>Again</div>
          </PodcastCard>
          <PodcastCard>
            <div>Hello</div>
            <div>Again</div>
          </PodcastCard>
          <PodcastCard>
            <div>Hello</div>
            <div>Again</div>
          </PodcastCard>
          <PodcastCard>
            <div>Hello</div>
            <div>Again</div>
          </PodcastCard>
          <PodcastCard>
            <div>Hello</div>
            <div>Again</div>
          </PodcastCard>
        </PodcastContainer>
      </Content>
    </GridContainer>
  );
}
