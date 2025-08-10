
import { useLocation, } from 'react-router-dom';
import styled from 'styled-components';



const IframeWrapper = styled.div`
  position: relative;
  padding-bottom: 100%;
  margin-top: 20px;
  height: 100vh;
  flex-shrink: 0;
  width: 100%;
  max-width: 100%;
  padding-right: calc(var(--bs-gutter-x) * 0.5);
  padding-left: calc(var(--bs-gutter-x) * 0.5);
`;

const FullSizeIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;



const ViewReport: React.FC = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);

  return (
    <IframeWrapper>
      <FullSizeIframe src={query.get('url') || ''} title="Report Preview" allowFullScreen />
    </IframeWrapper>
  );
};

export default ViewReport;
