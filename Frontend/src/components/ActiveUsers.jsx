import { useState } from "react";
import styled from "styled-components";

export default function ConsistentContributors({ users }) {
  const [showAll, setShowAll] = useState(false);

  if (!users.length) return null;

  const visibleUsers = showAll ? users : users.slice(0, 5);
  const remainingCount = users.length - 5;

  return (
    <Wrapper>
      <Title>Most Active Users</Title>
      <SubTitle>Users active for 4+ days</SubTitle>
      <Grid>
        {visibleUsers.map((user) => (
          <Card key={user.name}>
            <UserInfo>
              <Avatar src={"https://images.pexels.com/photos/5474040/pexels-photo-5474040.jpeg"} alt="user avatar" />
              <div>
                <Name>{user.name}</Name>
                <Tag>Consistent</Tag>
              </div>
            </UserInfo>

            <Badge>{user.activeDays} / 7 days</Badge>
          </Card>
        ))}

        {users.length > 5 && (
          <ViewMore onClick={() => setShowAll((prev) => !prev)}>
            {showAll
              ? "View Less"
              : `View ${remainingCount} More Contributors`}
          </ViewMore>
        )}
      </Grid>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: #0b1220;
  padding: 24px;
  color: white;
`;

const Title = styled.h2`
  font-size: 18px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SubTitle = styled.h3`
  font-size: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
`;

const Card = styled.div`
  background: linear-gradient(145deg, #0f172a, #020617);
  border: 1px solid #1e293b;
  border-radius: 14px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserInfo = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  background: #1e293b;
  border: 1px solid #334155;
`;


const Name = styled.p`
  font-size: 14px;
  font-weight: 500;
`;

const Tag = styled.p`
  font-size: 12px;
  color: #64748b;
`;

const Badge = styled.div`
  font-size: 12px;
  background: #0b5cff33;
  color: #3b82f6;
  padding: 4px 10px;
  border-radius: 20px;
`;

const ViewMore = styled.div`
  border: 1px dashed #334155;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  font-size: 14px;
`;