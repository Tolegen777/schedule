import {Input} from 'antd';
import styled from 'styled-components';
import {Colors} from "../const/const";


export const FormInput = styled(Input)`
  height: 64px;
  color: ${props => props.color};
  border-color: #d8dbe3;
  border-radius: 16px;
  font-size: 14px;
`;


FormInput.defaultProps = {
    color: Colors.Grey90,
    type: 'text',
}
