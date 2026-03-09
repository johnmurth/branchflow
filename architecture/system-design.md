# System Design Overview

## Goals
- Reliability over features
- Clear separation of concerns
- Observable business operations

## High-Level Flow
1. Customer places order via lightweight ordering page
2. Order is routed to a specific branch
3. Kitchen updates order state
4. Dispatch logs rider departure and return
5. Owner dashboard aggregates branch performance

## Core Domains
- Order
- Branch
- Dispatch
- Event Lead
- Subscription Client

## Non-Goals (for MVP)
- Real-time GPS tracking
- Payments integration
- Multi-language support

## Order Lifecycle
PENDING → ACCEPTED → PREPARING → READY → DISPATCHED → COMPLETED
                          ↘ CANCELLED 

### Rules
- An order belongs to exactly one branch
- Only ACCEPTED orders can move to PREPARING
- DESPATCHED requires a rider assignment
- COMPLETED requires dispatch return log

## Core Domain Models

### Order
- id
- branch_id
- status
- total_amount
- created_at

### Branch
- id
- name
- location

### Dispatching
- id
- order_id
- rider_id
- time_out
- time_in