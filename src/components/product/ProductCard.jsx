import styled from 'styled-components';
import { getImageUrl, formatPrice } from '../../utils/format';

const Card = styled.div`
  flex-shrink: 0;
  width: 140px;
  cursor: pointer;
`;

const Image = styled.img`
  width: 140px;
  height: 140px;
  border-radius: ${({ theme }) => theme.borderRadius.base};
  object-fit: cover;
  background-color: ${({ theme }) => theme.colors.gray100};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const Name = styled.p`
  font-size: ${({ theme }) => theme.fonts.size.base};
  color: ${({ theme }) => theme.colors.black};
  margin-top: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Price = styled.p`
  font-size: ${({ theme }) => theme.fonts.size.sm};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  margin-top: 4px;
`;

const ProductCard = ({ product, onClick }) => {
  return (
    <Card onClick={onClick}>
      <Image
        src={getImageUrl(product.itemImage)}
        alt={product.itemName}
        onError={(e) => { e.target.src = 'https://via.placeholder.com/140?text=No+Image'; }}
      />
      <Name>{product.itemName}</Name>
      <Price>{formatPrice(product.price)}원</Price>
    </Card>
  );
};

export default ProductCard;
