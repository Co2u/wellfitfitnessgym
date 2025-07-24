import React from 'react';
import MemberHead from '@/Components/Member/Head';
import LoggedInMemberHeader from '@/Components/LoggedInMember/Header';
import PolicyViolationBanner from '@/Components/LoggedInMember/PolicyViolationBanner';
import PolicyViolationContent from '@/Components/LoggedInMember/PolicyViolationContent';

import LoggedInMemberFooter from '@/Components/LoggedInMember/Footer';

export default function PolicyViolation() {
    return (
    <>
    
      <MemberHead />
      <LoggedInMemberHeader />
      <PolicyViolationBanner />
      <PolicyViolationContent />
      <LoggedInMemberFooter />
    </>
    );
}  