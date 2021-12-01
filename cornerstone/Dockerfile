# =====================
#     Base Image (LTS)
# =====================
FROM node:14.17-alpine AS base

# Create app directory
WORKDIR /opt/cornerstone

# Default Environment variables
ARG DOJOT_VERSION=undefined
ENV GUI_VERSION $DOJOT_VERSION
ARG BUILDER_MENU_ITENS
ENV BUILDER_MENU_ITENS=$BUILDER_MENU_ITENS


# Install app dependencies for production
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN yarn install --only=prod

# Copy Source
COPY . .

# Build code for production
RUN yarn run build

# Run the Builder to updated the configuration
RUN yarn builder

# =====================
#   Production Image
# =====================
FROM node:14.17-alpine AS prod

WORKDIR /opt/cornerstone

COPY --from=base /opt/cornerstone /opt/cornerstone

EXPOSE 3001

# Serve GUI
CMD ["yarn", "run", "serve"]

# HEALTHCHECK schema
# HEALTHCHECK --start-period=2m --interval=30s --timeout=10s --retries=3 \
# CMD curl -f http://localhost:9000/health || exit 1
