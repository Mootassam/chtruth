const backendUrl = `http://159.198.70.147:8080/api`;

// SwaggerUI Documentation URL
// Leave black if documentation should be hidden
const apiDocumentationUrl = `http://159.198.70.147:8080/documentation`;

/**
 * Frontend Url.
 */
const frontendUrl = {
  host: '159.198.70.147:3000',
  protocol: 'http',
};

/**
 * Tenant Mode
 * multi: Allow new users to create new tenants.
 * multi-with-subdomain: Same as multi, but enable access to the tenant via subdomain.
 * single: One tenant, the first user to register will be the admin.
 */
const tenantMode = 'single';

/**
 * Plan payments configuration.
 */
const isPlanEnabled = false;
const stripePublishableKey = '';

export default {
  frontendUrl,
  backendUrl,
  apiDocumentationUrl,
  tenantMode,
  isPlanEnabled,
  stripePublishableKey
};
