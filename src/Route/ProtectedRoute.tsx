import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
	auth: boolean;
	children?: React.ReactNode;
}
function ProtectedRoute({ auth, children }: ProtectedRouteProps) {
	if (!auth) {
		return <Navigate to={'/'} replace />;
	}
	return <Outlet />;
}

export default ProtectedRoute;
