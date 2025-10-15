<template>
    <USelect variant="ghost">
                <template #default="{modelValue}">
                    <div class="font-semibold text-primary hover:text-secondary">
                     {{ modelValue }}
                     </div>
                </template>
                <template #item="{item}">
                    <div class="font-semibold text-primary hover:text-secondary">
                        {{ item }}
                    </div>
                </template>
            </USelect>
    </template>
