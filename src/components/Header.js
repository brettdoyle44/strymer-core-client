import React from 'react';
import styled from 'styled-components';

const HeaderArea = styled.div`
  padding: 1em;
`;

const SearchBar = styled.input`
  width: 100%;
  border-radius: 25px;
  border: 1px solid #d1d8e0;
  padding: 1em 1.5em;
  background-color: #fff;
  &:focus {
    outline: none;
    border: 1px solid #ef1860;
  }
`;

const Header = () => {
  return (
    <HeaderArea>
      <SearchBar placeholder="Search for your favorite gaming podcast..." />
    </HeaderArea>
  );
};

export default Header;
