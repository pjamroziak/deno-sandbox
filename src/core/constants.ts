export const ClassType = {
    Service: 'jamcet:service',
    Controller: 'jamcet:controller',
} as const;

export const HttpMethodType = {
    Get: 'GET',
    Post: 'POST',
    Put: 'PUT',
    Delete: 'DELETE',
    Patch: 'PATCH',
    Options: 'OPTIONS',
    Head: 'HEAD',
    All: 'ALL',
} as const;
