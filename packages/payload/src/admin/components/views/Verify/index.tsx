import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import type { SanitizedCollectionConfig } from '../../../../collections/config/types.js';

import Button from '../../elements/Button/index.js';
import Logo from '../../graphics/Logo/index.js';
import MinimalTemplate from '../../templates/Minimal/index.js';
import { useAuth } from '../../utilities/Auth/index.js';
import { useConfig } from '../../utilities/Config/index.js';
import Meta from '../../utilities/Meta/index.js';
import Login from '../Login/index.js';
import './index.scss';

const baseClass = 'verify';

const Verify: React.FC<{ collection: SanitizedCollectionConfig }> = ({ collection }) => {
  const { slug: collectionSlug } = collection;

  const { user } = useAuth();
  const { token } = useParams<{token?: string}>();
  const { admin: { user: adminUser }, routes: { admin: adminRoute }, serverURL } = useConfig();
  const { i18n, t } = useTranslation('authentication');

  const isAdminUser = collectionSlug === adminUser;
  const [verifyResult, setVerifyResult] = useState(null);

  useEffect(() => {
    async function verifyToken() {
      const result = await fetch(`${serverURL}/api/${collectionSlug}/verify/${token}`, {
        credentials: 'include',
        headers: {
          'Accept-Language': i18n.language,
        },
        method: 'POST',
      });
      setVerifyResult(result);
    }
    verifyToken();
  }, [setVerifyResult, collectionSlug, serverURL, token, i18n]);

  if (user) {
    return <Login />;
  }

  const getText = () => {
    if (verifyResult?.status === 200) return t('verifiedSuccessfully');
    if (verifyResult?.status === 202) return t('alreadyActivated');
    return t('unableToVerify');
  };

  return (
    <MinimalTemplate className={baseClass}>
      <Meta
        description={t('verifyUser')}
        keywords={t('verify')}
        title={t('verify')}
      />
      <div className={`${baseClass}__brand`}>
        <Logo />
      </div>
      <h2>
        {getText()}
      </h2>
      {isAdminUser && verifyResult?.status === 200 && (
        <Button
          buttonStyle="secondary"
          el="link"
          to={`${adminRoute}/login`}
        >
          {t('login')}
        </Button>
      )}
    </MinimalTemplate>
  );
};
export default Verify;
