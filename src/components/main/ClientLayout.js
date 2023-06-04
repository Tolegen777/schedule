import React from 'react';
import Layout from 'antd/es/layout/layout';
import styled from 'styled-components';
import {BodyContainer, ContentLayout} from './style';
import {Colors} from "../../const/const";
import {AppHeader} from "./AppHeader";

const ClientLayoutWrapper = styled(Layout)`
  background-color: ${Colors.White};
`;

export const ClientLayout = ({ children }) => {

    return (
        <ClientLayoutWrapper>
            {/*<AppHeader />*/}

            <BodyContainer>
                <ContentLayout>
                    { children }
                </ContentLayout>
            </BodyContainer>
        </ClientLayoutWrapper>
    );
};
