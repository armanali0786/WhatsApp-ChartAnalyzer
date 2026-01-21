
import styled from "styled-components";

export default function ChatUpload({ onAnalyze, loading }) {
    const handleFileSelect = (file) => {
        if (file && file.type === "text/plain") {
            onAnalyze(file);
        } else {
            alert("Please upload a valid .txt file");
        }
    };

    return (
        <Page>
            <Card>
                <Title>
                    Unlock Insights from Your <Blue>Conversations</Blue>
                </Title>

                <Description>
                    Upload your exported WhatsApp .txt file to visualize engagement,
                    top active users, and chart visualizations.
                </Description>

                <DropZone
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                        e.preventDefault();
                        handleFileSelect(e.dataTransfer.files[0]);
                    }}
                >
                    <FileIcon>📄</FileIcon>
                    <p>Drag and drop your chat file here</p>
                    <div style={{marginTop:"15px"}}>
                    <BrowseBtn as="label">
                        Browse Files
                        <input
                            type="file"
                            accept=".txt"
                            hidden
                            onChange={(e) => handleFileSelect(e.target.files[0])}
                        />
                    </BrowseBtn>
                    </div>
                </DropZone>

                <ProcessBtn disabled={loading}>
                    {loading ? "Processing..." : "Process Data"}
                </ProcessBtn>

                <FooterText>
                   Your data is processed locally. We never upload your logs.
                </FooterText>
            </Card>
        </Page>
    );
}

const Page = styled.div`
  min-height: 100vh;
  background: #0b1220;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  color: #fff;
`;

const Card = styled.div`
  max-width: 520px;
  width: 100%;
  background: #0f172a;
  border: 1px solid #1e293b;
  border-radius: 20px;
  padding: 32px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const Blue = styled.span`
  color: #3b82f6;
`;

const Description = styled.p`
  text-align: center;
  font-size: 14px;
  color: #94a3b8;
  margin-bottom: 24px;
`;

const DropZone = styled.div`
  border: 1px dashed #334155;
  border-radius: 16px;
  padding: 32px;
  text-align: center;
  margin-bottom: 24px;
`;

const FileIcon = styled.div`
  width: 48px;
  height: 48px;
  background: #1e293b;
  border-radius: 50%;
  margin: 0 auto 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const BrowseBtn = styled.button`
  margin-top: 16px;
  background: #1e293b;
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  color: #fff;
  cursor: pointer;

  &:hover {
    background: #273549;
  }
`;

const ProcessBtn = styled.button`
  width: 100%;
  background: #2563eb;
  padding: 14px;
  border-radius: 12px;
  border: none;
  color: #fff;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: #1d4ed8;
  }
`;

const FooterText = styled.p`
  margin-top: 12px;
  font-size: 12px;
  text-align: center;
  color: #64748b;
`;
