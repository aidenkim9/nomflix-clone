import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  padding-bottom: 4rem;
  color: rgba(255, 255, 255, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
`;
function Footer() {
  return (
    <Container>
      <span>
        &copy; {new Date().getFullYear()} Nomflix. All rights reserved.
      </span>
    </Container>
  );
}

export default Footer;
