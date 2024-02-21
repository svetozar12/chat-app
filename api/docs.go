// Package api GENERATED BY SWAG; DO NOT EDIT
// This file was generated by swaggo/swag
package api

import "github.com/swaggo/swag"

const docTemplate = `{
    "schemes": {{ marshal .Schemes }},
    "swagger": "2.0",
    "info": {
        "description": "{{escape .Description}}",
        "title": "{{.Title}}",
        "termsOfService": "http://swagger.io/terms/",
        "contact": {
            "name": "API Support",
            "email": "fiber@swagger.io"
        },
        "license": {
            "name": "Apache 2.0",
            "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
        },
        "version": "{{.Version}}"
    },
    "host": "{{.Host}}",
    "basePath": "{{.BasePath}}",
    "paths": {
        "/v1/chat": {
            "get": {
                "consumes": [
                    "application/json"
                ],
                "tags": [
                    "chats"
                ],
                "summary": "Get all chats",
                "parameters": [
                    {
                        "type": "integer",
                        "default": 1,
                        "description": "page",
                        "name": "page",
                        "in": "query"
                    },
                    {
                        "type": "integer",
                        "default": 10,
                        "description": "limit",
                        "name": "limit",
                        "in": "query"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/schemas.PaginationSchema-models_Chat"
                        }
                    }
                }
            }
        },
        "/v1/messages": {
            "get": {
                "consumes": [
                    "application/json"
                ],
                "tags": [
                    "messages"
                ],
                "summary": "Get all messages",
                "parameters": [
                    {
                        "type": "integer",
                        "default": 1,
                        "description": "page",
                        "name": "page",
                        "in": "query"
                    },
                    {
                        "type": "integer",
                        "default": 10,
                        "description": "limit",
                        "name": "limit",
                        "in": "query"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/schemas.PaginationSchema-models_Message"
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "models.Chat": {
            "type": "object",
            "properties": {
                "id": {
                    "description": "Unique identifier for the chat",
                    "type": "string"
                },
                "members": {
                    "description": "User IDs of chat members",
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                }
            }
        },
        "models.Message": {
            "type": "object",
            "properties": {
                "chatID": {
                    "description": "ID of the chat this message belongs to",
                    "type": "string"
                },
                "content": {
                    "description": "Message content",
                    "type": "string"
                },
                "id": {
                    "description": "Unique identifier for the message",
                    "type": "string"
                },
                "time": {
                    "description": "Timestamp of when the message was sent",
                    "type": "string"
                },
                "userID": {
                    "description": "ID of the user who sent the message",
                    "type": "string"
                }
            }
        },
        "schemas.Pagination": {
            "type": "object",
            "required": [
                "limit",
                "offSet",
                "total"
            ],
            "properties": {
                "limit": {
                    "type": "integer"
                },
                "offSet": {
                    "type": "integer"
                },
                "total": {
                    "type": "integer"
                }
            }
        },
        "schemas.PaginationSchema-models_Chat": {
            "type": "object",
            "required": [
                "data",
                "pagination"
            ],
            "properties": {
                "data": {
                    "$ref": "#/definitions/models.Chat"
                },
                "pagination": {
                    "$ref": "#/definitions/schemas.Pagination"
                }
            }
        },
        "schemas.PaginationSchema-models_Message": {
            "type": "object",
            "required": [
                "data",
                "pagination"
            ],
            "properties": {
                "data": {
                    "$ref": "#/definitions/models.Message"
                },
                "pagination": {
                    "$ref": "#/definitions/schemas.Pagination"
                }
            }
        }
    }
}`

// SwaggerInfo holds exported Swagger Info so clients can modify it
var SwaggerInfo = &swag.Spec{
	Version:          "1.0",
	Host:             "localhost:3000",
	BasePath:         "/",
	Schemes:          []string{},
	Title:            "Fiber Example API",
	Description:      "This is a sample swagger for Fiber",
	InfoInstanceName: "swagger",
	SwaggerTemplate:  docTemplate,
}

func init() {
	swag.Register(SwaggerInfo.InstanceName(), SwaggerInfo)
}
