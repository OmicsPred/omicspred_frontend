import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
    Toolbar,
    ToolbarButton,
    ColumnsPanelTrigger,
    FilterPanelTrigger,
    ExportCsv,
    ExportPrint,
    QuickFilter,
    QuickFilterControl,
    QuickFilterClear,
    QuickFilterTrigger,
  } from '@mui/x-data-grid';
  import Tooltip from '@mui/material/Tooltip';
  import Menu from '@mui/material/Menu';
  import Badge from '@mui/material/Badge';
  import ViewColumnIcon from '@mui/icons-material/ViewColumn';
  import FilterListIcon from '@mui/icons-material/FilterList';
  import FileDownloadIcon from '@mui/icons-material/FileDownload';
  import MenuItem from '@mui/material/MenuItem';
  import Divider from '@mui/material/Divider';
  import TextField from '@mui/material/TextField';
  import InputAdornment from '@mui/material/InputAdornment';
  import CancelIcon from '@mui/icons-material/Cancel';
  import SearchIcon from '@mui/icons-material/Search';


const StyledQuickFilter = styled(QuickFilter)({
    display: 'grid',
    alignItems: 'center'
});


const StyledToolbarButton = styled(ToolbarButton)(({ theme, ownerState }) => ({
    gridArea: '1 / 1',
    width: 'min-content',
    height: 'min-content',
    zIndex: 1,
    opacity: ownerState.expanded ? 0 : 1,
    pointerEvents: ownerState.expanded ? 'none' : 'auto',
    transition: theme.transitions.create(['opacity']),
}));


const StyledTextField = styled(TextField)(({ theme, ownerState }) => ({
    gridArea: '1 / 1',
    overflowX: 'clip',
    width: ownerState.expanded ? 260 : 'var(--trigger-width)',
    opacity: ownerState.expanded ? 1 : 0,
    transition: theme.transitions.create(['width', 'opacity']),
}));


const VerticalDivider = () => {
    return (
        <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 0.5 }} />
    )
}


const ColumnSelection = () => {
    return (
        <Tooltip title="Columns Selection">
            <ColumnsPanelTrigger render={<ToolbarButton />}>
                <ViewColumnIcon fontSize="small" />
            </ColumnsPanelTrigger>
        </Tooltip>
    )
}


const OPQuickFilterTrigger = () => {
    return (
        <QuickFilterTrigger
            render={(triggerProps, state) => (
                <Tooltip title="Search" enterDelay={0}>
                    <StyledToolbarButton
                        {...triggerProps}
                        ownerState={{ expanded: state.expanded }}
                        color="default"
                        aria-disabled={state.expanded}
                    >
                        <SearchIcon fontSize="small" />
                    </StyledToolbarButton>
                </Tooltip>
            )}
        />
    )
}

const OPQuickFilterControl = () => {
    return (
        <QuickFilterControl
            render={({ ref, ...controlProps }, state) => (
                <StyledTextField
                {...controlProps}
                ownerState={{ expanded: state.expanded }}
                inputRef={ref}
                aria-label="Search"
                placeholder="Search..."
                size="small"
                slotProps={{
                    input: {
                    startAdornment: (
                        <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                        </InputAdornment>
                    ),
                    endAdornment: state.value ? (
                        <InputAdornment position="end">
                        <QuickFilterClear
                            edge="end"
                            size="small"
                            aria-label="Clear search"
                            material={{ sx: { marginRight: -0.75 } }}
                        >
                            <CancelIcon fontSize="small" />
                        </QuickFilterClear>
                        </InputAdornment>
                    ) : null,
                    ...controlProps.slotProps?.input,
                    },
                    ...controlProps.slotProps,
                }}
                />
            )}
        />
    )
}

const QuickFilterComponent = () => {
    return (
        <StyledQuickFilter>
            <OPQuickFilterTrigger/>
            <OPQuickFilterControl/>
        </StyledQuickFilter>
    )
}


const QuickFilterComponentExpanded = () => {
    return (
        <StyledQuickFilter expanded="true">
            <OPQuickFilterTrigger/>
            <OPQuickFilterControl/>
        </StyledQuickFilter>
    )
}


export const CustomToolbar = (expanded_search) => {
    const [exportMenuOpen, setExportMenuOpen] = React.useState(false);
    const exportMenuTriggerRef = React.useRef(null);
    return (
        <Toolbar>
            {/* Columns selection */}
            <ColumnSelection />
    
            {/* Data filter */}
            <Tooltip title="Data Filters">
                <FilterPanelTrigger
                    render={(filter_props, state) => (
                        <ToolbarButton {...filter_props}>
                            <Badge badgeContent={state.filterCount} variant="dot">
                                <FilterListIcon fontSize="small" />
                            </Badge>
                        </ToolbarButton>
                    )}
                />
            </Tooltip>

            <VerticalDivider />
        
            {/* Data exports */}
            <Tooltip title="Data Export">
                <ToolbarButton
                    ref={exportMenuTriggerRef}
                    id="export-menu-trigger"
                    aria-controls="export-menu"
                    aria-haspopup="true"
                    aria-expanded={exportMenuOpen ? 'true' : undefined}
                    onClick={() => setExportMenuOpen(true)}
                >
                    <FileDownloadIcon fontSize="small" />
                </ToolbarButton>
            </Tooltip>
            <Menu
                id="export-menu"
                anchorEl={exportMenuTriggerRef.current}
                open={exportMenuOpen}
                onClose={() => setExportMenuOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                slotProps={{
                    list: { 'aria-labelledby': 'export-menu-trigger', },
                }}
            >
                <ExportPrint render={<MenuItem />} onClick={() => setExportMenuOpen(false)}>Print</ExportPrint>
                <ExportCsv render={<MenuItem />} onClick={() => setExportMenuOpen(false)}>Download as CSV</ExportCsv>
            </Menu>

            <VerticalDivider />

            {/* Search */}
            { expanded_search ? <QuickFilterComponentExpanded /> : <QuickFilterComponent /> }
        </Toolbar>
    );
}


export const CustomToolbarLight = () => {
    return (
        <Toolbar>
            {/* Columns selection */}
            <ColumnSelection />

            <VerticalDivider />

            {/* Search */}
            <QuickFilterComponentExpanded />
        </Toolbar>
    );
}

export const CustomToolbarNoSearch = () => {
    return (
        <Toolbar>
            {/* Columns selection */}
            <ColumnSelection />
        </Toolbar>
    );
}